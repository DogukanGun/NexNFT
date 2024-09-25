from pydantic import BaseModel


class ChainData(BaseModel):
    api_link: str
    name: str
