from typing import List, Literal, Optional
from pydantic import BaseModel


class Message(BaseModel):
    id: str
    text: str
    sender: Literal["user", "assistant"]
    timestamp: str
    status: Literal["success", "error"]
    statusMessage: Optional[str] = None


class Convo(BaseModel):
    id: Optional[str]
    userId: str
    title: str
    model: str
    timestamp: Optional[str] = None
    isArchived: bool = False


class ChatCompletion(BaseModel):
    id: str
    object: str
    created: int
    model: str
    choices: List[dict]
    usage: dict
