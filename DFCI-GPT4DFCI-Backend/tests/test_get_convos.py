from azure.cosmos import ContainerProxy
from fastapi.testclient import TestClient
from app.utils import generate_uuid


def test_multiple_convos_are_retrieved(client: TestClient):
    user_id = generate_uuid()

    container: ContainerProxy = client.app.state.cosmos_container

    convo_a = {
        "id": "convo_a",
        "userId": user_id,
        "title": "convo_a",
        "model": "does-not-matter",
        "timestamp": "does-not-matter",
        "isArchived": False,
        # omitting messages for convenience
    }

    convo_b = {
        "id": "convo_b",
        "userId": user_id,
        "title": "convo_b",
        "model": "does-not-matter",
        "timestamp": "does-not-matter",
        "isArchived": False,
        # omitting messages for convenience
    }

    container.create_item(convo_a)
    container.create_item(convo_b)

    response = client.get("/convos", headers={"user-id": user_id})

    assert response.status_code == 200
    assert response.json() == [
        convo_a,
        convo_b,
    ]


def test_nonexistent_user_returns_empty_list(client: TestClient):
    user_id = generate_uuid()

    response = client.get("/convos", headers={"user-id": user_id})

    assert response.status_code == 200
    assert response.json() == []


def test_empty_user_id_throws_error(client):
    response = client.get("/convos", headers={"user-id": ""})

    assert response.status_code == 400


def test_missing_user_id_throws_error(client):
    response = client.get("/convos")

    assert response.status_code == 422
