from azure.cosmos import ContainerProxy
from fastapi.testclient import TestClient


def test_title_can_be_updated(client: TestClient):
    container: ContainerProxy = client.app.state.cosmos_container

    convo = {
        "id": "does-not-matter",
        "userId": "does-not-matter",
        "title": "does-not-matter",
        "model": "does-not-matter",
        "timestamp": "does-not-matter",
        "isArchived": False,
        "messages": [],
    }

    container.create_item(convo)

    update = {
        "id": "does-not-matter",
        "userId": "does-not-matter",
        "title": "should-not-matter",
        "model": "does-not-matter",
        "timestamp": "does-not-matter",
        "isArchived": False,
        "messages": [],
    }

    response = client.patch(
        f"/convos/{convo['id']}", headers={"user-id": convo["userId"]}, json=update
    )

    assert response.status_code == 200

    # try and fetch updated convo
    query = "SELECT * FROM convos c where \
        c.id = @convoId and \
        c.userId = @userId"

    params: list[dict[str, object]] = [
        {"name": "@convoId", "value": convo["id"]},
        {"name": "@userId", "value": convo["userId"]},
    ]

    results = container.query_items(
        query=query,
        parameters=params,
        enable_cross_partition_query=False,
    )

    results = list(results)

    assert len(results) == 1
    assert results[0]["title"] == update["title"]
