from azure.cosmos import ContainerProxy
from fastapi.testclient import TestClient
from app.utils import generate_uuid


def test_correct_convo_is_returned(client: TestClient):
    container: ContainerProxy = client.app.state.cosmos_container

    convo = {
        "id": "does-not-matter",
        "userId": "does-not-matter",
        "title": "does-not-matter",
        "model": "does-not-matter",
        "timestamp": "does-not-matter",
        "isArchived": False,
        # omitting messages for convenience
    }

    container.create_item(convo)

    response = client.get(
        f"/convos/{convo['id']}", headers={"user-id": convo["userId"]}
    )

    assert response.status_code == 200
    assert response.json() == convo


def test_error_is_thrown_when_no_convo_exists(client: TestClient):
    user_id = generate_uuid()

    response_get = client.get(
        "/convos/id-that-does-not-exist", headers={"user-id": user_id}
    )

    assert response_get.status_code == 404
