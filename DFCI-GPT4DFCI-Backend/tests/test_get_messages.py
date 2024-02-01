from typing import List
from azure.cosmos import ContainerProxy
from fastapi.testclient import TestClient
from app.models import Message


def test_correct_messages_are_fetched(client: TestClient):
    container: ContainerProxy = client.app.state.cosmos_container

    convo = {
        "id": "does-not-matter",
        "userId": "does-not-matter",
        "title": "does-not-matter",
        "model": "does-not-matter",
        "timestamp": "does-not-matter",
        "isArchived": False,
        "messages": [
            {
                "id": "does-not-matter",
                "text": "first message",
                "sender": "user",
                "timestamp": "does-not-matter",
                "status": "success",
                "statusMessage": None,
            }
        ],
    }

    container.create_item(convo)

    response = client.get(
        f"/convos/{convo['id']}/messages",
        headers={"user-id": convo["userId"]},
    )

    assert response.status_code == 200

    messages: List[Message] = response.json()

    assert messages == convo["messages"]
