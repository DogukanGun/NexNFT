from typing import List, Any, Dict

from fastapi import APIRouter, Depends, Security
from starlette.responses import JSONResponse

from controller.data.chain_data import ChainData
from utils.constants.collection_name import CollectionName
from utils.database.database import get_db, Database

router = APIRouter(tags=["Chains"], prefix="/chains")


@router.get("/supported", response_model=List[ChainData])
def get_supported_chains(
        db: Database = Depends(get_db)
):
    objs = db.get_object(CollectionName.CHAINS.value)
    return [ChainData(**index) for index in objs]


@router.post("/", response_model=Dict[Any, Any])
def add_chain(
        chain_data: ChainData,
        db: Database = Depends(get_db)
):
    obj_id = db.insert_object(CollectionName.CHAINS.value, chain_data.__dict__)
    return JSONResponse(content=obj_id.__str__())
