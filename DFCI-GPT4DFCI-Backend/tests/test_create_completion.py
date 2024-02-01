from fastapi.testclient import TestClient


def test_create_completion_returns_dict_with_expected_keys(client: TestClient):
    response = client.post(
        "/completion",
        params={"deployment_name": "gpt-35-turbo-0613"},
        json=[
            {
                "id": "",
                "text": "Tell me a joke about ChatGPT.",
                "sender": "user",
                "timestamp": "",
                "status": "success",
                "statusMessage": "",
            }
        ],
    )

    assert response.status_code == 200

    result = response.json()

    assert list(result.keys()) == [
        "id",
        "object",
        "created",
        "model",
        "choices",
        "usage",
    ]


def test_missing_deployment_name_throws_error(client: TestClient):
    response = client.post(
        "/completion",
        json=[
            {
                "id": "",
                "text": "Tell me a joke about ChatGPT.",
                "sender": "user",
                "timestamp": "",
                "status": "success",
                "statusMessage": "",
            }
        ],
    )

    assert response.status_code == 422
