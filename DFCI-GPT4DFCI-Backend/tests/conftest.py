import logging

from azure.cosmos import CosmosClient, PartitionKey
from dotenv import dotenv_values
from fastapi.testclient import TestClient
import pytest
from app.main import app

config = dotenv_values(".env.test")

AZURE_COSMOSDB_ENDPOINT = config["AZURE_COSMOSDB_ENDPOINT"]
AZURE_COSMOSDB_KEY = config["AZURE_COSMOSDB_KEY"]
AZURE_COSMOSDB_DATABASE = config["AZURE_COSMOSDB_DATABASE"]
AZURE_COSMOSDB_CONTAINER = config["AZURE_COSMOSDB_CONTAINER"]

logging.info(
    f"""
Using Cosmos config:
    Endpoint: {AZURE_COSMOSDB_ENDPOINT}
    Database: {AZURE_COSMOSDB_DATABASE}
    Container: {AZURE_COSMOSDB_CONTAINER}
""",
)


@pytest.fixture
def test_container():
    try:
        db = CosmosClient(
            url=AZURE_COSMOSDB_ENDPOINT,
            credential=AZURE_COSMOSDB_KEY,
        ).get_database_client(database=AZURE_COSMOSDB_DATABASE)

        partition_key = PartitionKey(path="/userId")
        container = db.create_container_if_not_exists(
            id=AZURE_COSMOSDB_CONTAINER,
            partition_key=partition_key,
        )

        yield container

    finally:
        db.delete_container(container)


@pytest.fixture
def client(test_container):
    app.state.cosmos_container = test_container
    return TestClient(app)
