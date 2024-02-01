from contextlib import asynccontextmanager
from typing import Annotated, List

from azure.cosmos import CosmosClient, ContainerProxy, PartitionKey
from dotenv import dotenv_values
from fastapi import Depends, FastAPI, Header, HTTPException, Request
import openai

from app.models import Convo, Message, ChatCompletion
from app.utils import generate_uuid, generate_timestamp

config = dotenv_values()

AZURE_COSMOSDB_ENDPOINT = config["AZURE_COSMOSDB_ENDPOINT"]
AZURE_COSMOSDB_KEY = config["AZURE_COSMOSDB_KEY"]
AZURE_COSMOSDB_DATABASE = config["AZURE_COSMOSDB_DATABASE"]
AZURE_COSMOSDB_CONTAINER = config["AZURE_COSMOSDB_CONTAINER"]

openai.api_type = config["AZURE_OPENAI_API_TYPE"]
openai.api_base = config["AZURE_OPENAI_ENDPOINT"]
openai.api_version = config["AZURE_OPENAI_API_VERSION"]
openai.api_key = config["AZURE_OPENAI_KEY"]


@asynccontextmanager
async def lifespan(app: FastAPI):
    partition_key = PartitionKey(
        path="/userId"
    )
    app.state.cosmos_container = (
        CosmosClient(
            url=AZURE_COSMOSDB_ENDPOINT,
            credential=AZURE_COSMOSDB_KEY,
        )
        .get_database_client(database=AZURE_COSMOSDB_DATABASE)
        .create_container_if_not_exists(
            id=AZURE_COSMOSDB_CONTAINER,
            partition_key=partition_key,
        )
    )
    yield


def get_container(request: Request):
    return request.app.state.cosmos_container


def verify_user_id(user_id: Annotated[str, Header()]):
    if len(user_id) == 0:
        raise HTTPException(status_code=400, detail="User ID invalid.")

    return user_id


app = FastAPI(
    title="GPT4DFCI - Backend",
    lifespan=lifespan,
)


@app.post("/completion")
def create_completion(
    deployment_name: str,
    messages: List[Message],
) -> ChatCompletion:
    # reformat to fit OpenAI API request schema
    reformatted_messages = [
        {"role": message.sender, "content": message.text} for message in messages
    ]
    response = openai.ChatCompletion.create(
        engine=deployment_name,
        messages=reformatted_messages,
        temperature=0.1,
        max_tokens=800,
        top_p=0.95,
        frequency_penalty=0,
        presence_penalty=0,
        stop=None,
    )
    return response


@app.get("/convos")
def get_convos(
    user_id: Annotated[str, Depends(verify_user_id)],
    container: Annotated[ContainerProxy, Depends(get_container)],
) -> List[Convo]:
    """Get all conversations for the given user, excluding messages."""
    query = "SELECT * FROM convos c where c.userId = @userId"
    params: list[dict[str, object]] = [{"name": "@userId", "value": user_id}]

    items = container.query_items(
        query=query, parameters=params, enable_cross_partition_query=False
    )

    # exclude messages
    results = []

    for result in items:
        result.pop("messages", None)
        results.append(Convo(**result))

    return results


@app.post("/convos")
def create_convo(
    convo: Convo,
    user_id: Annotated[str, Depends(verify_user_id)],
    container: Annotated[ContainerProxy, Depends(get_container)],
    timestamp: Annotated[str, Depends(generate_timestamp)],
) -> Convo:
    """Create a new conversation.

    Returns the created conversation.
    """
    convo_json = convo.model_dump(mode="json")

    # generate ID and timestamp
    convo_json["id"] = generate_uuid()
    convo_json["userId"] = user_id
    convo_json["timestamp"] = timestamp
    convo_json["messages"] = []

    item = container.create_item(convo_json)

    created_convo = Convo(**item)
    return created_convo


@app.get("/convos/{convo_id}")
def get_convo(
    convo_id: str,
    user_id: Annotated[str, Depends(verify_user_id)],
    container: Annotated[ContainerProxy, Depends(get_container)],
) -> Convo:
    """Get a conversation by ID."""

    # exclude messages
    query = "SELECT \
        c.id, \
        c.userId,\
        c.title, \
        c.model, \
        c.timestamp, \
        c.isArchived \
        FROM convos c where \
        c.id = @convoId and \
        c.userId = @userId"

    params: list[dict[str, object]] = [
        {"name": "@convoId", "value": convo_id},
        {"name": "@userId", "value": user_id},
    ]

    results = container.query_items(
        query=query, parameters=params, enable_cross_partition_query=False
    )

    results = list(results)

    if len(results) == 0:
        raise HTTPException(
            status_code=404,
            detail="Conversation not found.",
        )

    elif len(results) == 1:
        returned_convo = results[0]

        return Convo(**returned_convo)

    else:
        raise HTTPException(
            status_code=500,
            detail="Multiple conversations with given ID found.",
        )


@app.patch("/convos/{convo_id}")
def update_convo(
    convo_id: str,
    convo: Convo,
    user_id: Annotated[str, Depends(verify_user_id)],
    container: Annotated[ContainerProxy, Depends(get_container)],
) -> Convo:
    """Update a conversation with the given values.

    If successful, returns the updated convo.
    """
    if convo.id != convo_id:
        raise HTTPException(
            status_code=400,
            detail="Conversation ID in body must match ID provided in path.",
        )

    if convo.userId != user_id:
        raise HTTPException(
            status_code=400, detail="User ID in body must match ID provided in header."
        )

    stored_convo = get_convo(convo_id=convo_id, user_id=user_id, container=container)
    stored_messages = get_messages(
        convo_id=convo_id, user_id=user_id, container=container
    )

    data_to_update = convo.model_dump(mode="json", exclude_unset=True)

    updated_convo = stored_convo.model_copy(
        update=data_to_update, deep=True
    ).model_dump(mode="json")

    updated_convo["messages"] = stored_messages

    item = container.upsert_item(updated_convo)

    returned_convo = Convo(**item)
    return returned_convo


@app.get("/convos/{convo_id}/messages")
def get_messages(
    convo_id: str,
    user_id: Annotated[str, Depends(verify_user_id)],
    container: Annotated[ContainerProxy, Depends(get_container)],
) -> List[Message]:
    """Get the messages for a given convo."""

    # fetch messages
    query = "SELECT c.messages FROM convos c where \
        c.id = @convoId and \
        c.userId = @userId"

    params: list[dict[str, object]] = [
        {"name": "@convoId", "value": convo_id},
        {"name": "@userId", "value": user_id},
    ]

    results = container.query_items(
        query=query, parameters=params, enable_cross_partition_query=False
    )

    results = list(results)

    # spot checks
    if len(results) == 0 or "messages" not in results[0].keys():
        raise HTTPException(status_code=404, detail="Messages not found.")

    elif len(results) == 1:
        return results[0]["messages"]

    else:
        raise HTTPException(status_code=400, detail="Multiple sets of messages found.")


@app.post("/convos/{convo_id}/messages")
def add_messages(
    convo_id: str,
    messages: List[Message],
    user_id: Annotated[str, Depends(verify_user_id)],
    container: Annotated[ContainerProxy, Depends(get_container)],
    timestamp: Annotated[str, Depends(generate_timestamp)],
) -> List[Message]:
    """Append one or more messages to the list of messages for a given convo.

    If successful, returns the updated list of messages.
    """
    # fetch convo
    convo = get_convo(
        convo_id=convo_id, user_id=user_id, container=container
    ).model_dump(mode="json")

    # fetch messages
    stored_messages = get_messages(
        convo_id=convo_id, user_id=user_id, container=container
    )

    # add timestamp
    new_messages = []

    for message in messages:
        new_message = message.model_dump(mode="json")

        new_message["id"] = generate_uuid()
        new_message["timestamp"] = timestamp

        new_messages.append(new_message)

    # append to existing messages
    convo["messages"] = stored_messages + new_messages

    updated_convo = container.upsert_item(convo)

    # return created messages
    return updated_convo["messages"]
