import datetime
import uuid


def generate_uuid():
    return str(uuid.uuid4())


def generate_timestamp():
    return datetime.datetime.utcnow().isoformat()


def is_valid_uuid(to_check: str, version: int = 4):
    # reference: https://stackoverflow.com/a/33245493
    try:
        uuid_obj = uuid.UUID(to_check, version=version)

    except ValueError:
        return False

    return str(uuid_obj) == to_check
