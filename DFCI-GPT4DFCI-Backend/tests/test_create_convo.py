from azure.cosmos import ContainerProxy
from fastapi.testclient import TestClient
from app.utils import generate_uuid, is_valid_uuid


def test_item_is_created(client: TestClient):
    user_id = generate_uuid()
    response = client.post(
        "/convos",
        headers={"user-id": user_id},
        json={
            "id": "does-not-matter",
            "userId": user_id,
            "title": "does-not-matter",
            "model": "does-not-matter",
            "timestamp": "does-not-matter",
            "isArchived": False,
        },
    )

    convo = response.json()

    # try to fetch created convo
    container: ContainerProxy = client.app.state.cosmos_container

    query = "SELECT * FROM convos c where \
        c.id = @convoId and \
        c.userId = @userId"

    params: list[dict[str, object]] = [
        {"name": "@convoId", "value": convo["id"]},
        {"name": "@userId", "value": user_id},
    ]

    results = container.query_items(
        query=query,
        parameters=params,
        enable_cross_partition_query=False,
    )

    results = list(results)

    assert len(results) == 1
    assert results[0]["id"] == convo["id"]


def test_valid_uuid_is_generated_for_id(client: TestClient):
    user_id = generate_uuid()
    response = client.post(
        "/convos",
        headers={"user-id": user_id},
        json={
            "id": "does-not-matter",
            "userId": user_id,
            "title": "does-not-matter",
            "model": "does-not-matter",
            "timestamp": "does-not-matter",
            "isArchived": False,
        },
    )

    convo = response.json()

    assert response.status_code == 200
    assert is_valid_uuid(convo["id"])


def test_empty_message_list_is_created(client: TestClient):
    user_id = generate_uuid()
    response = client.post(
        "/convos",
        headers={"user-id": user_id},
        json={
            "id": "does-not-matter",
            "userId": user_id,
            "title": "does-not-matter",
            "model": "does-not-matter",
            "timestamp": "does-not-matter",
            "isArchived": False,
        },
    )

    convo = response.json()

    # try to fetch created messages
    container: ContainerProxy = client.app.state.cosmos_container

    query = "SELECT c.messages FROM convos c where \
        c.id = @convoId and \
        c.userId = @userId"

    params: list[dict[str, object]] = [
        {"name": "@convoId", "value": convo["id"]},
        {"name": "@userId", "value": user_id},
    ]

    results = container.query_items(
        query=query,
        parameters=params,
        enable_cross_partition_query=False,
    )

    results = list(results)

    assert len(results) == 1
    assert results[0]["messages"] == []


def test_messages_in_body_are_ignored(client: TestClient):
    user_id = generate_uuid()
    response_post = client.post(
        "/convos",
        headers={"user-id": user_id},
        json={
            "id": "does-not-matter",
            "userId": user_id,
            "title": "does-not-matter",
            "messages": [
                {
                    "id": generate_uuid(),
                    "text": "does-not-matter",
                    "sender": "user",
                    "timestamp": "does-not-matter",
                    "status": "success",
                    "statusMessage": None,
                }
            ],
            "model": "does-not-matter",
            "timestamp": "does-not-matter",
            "isArchived": False,
        },
    )

    convo = response_post.json()

    # try to fetch created messages
    container: ContainerProxy = client.app.state.cosmos_container

    query = "SELECT c.messages FROM convos c where \
        c.id = @convoId and \
        c.userId = @userId"

    params: list[dict[str, object]] = [
        {"name": "@convoId", "value": convo["id"]},
        {"name": "@userId", "value": user_id},
    ]

    results = container.query_items(
        query=query,
        parameters=params,
        enable_cross_partition_query=False,
    )

    results = list(results)

    assert len(results) == 1
    assert results[0]["messages"] == []
