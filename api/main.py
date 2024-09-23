import torch
from io import BytesIO
from PIL import Image
import base64
from diffusers import DiffusionPipeline,PixArtAlphaPipeline
from transformers import T5EncoderModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI,APIRouter

def generate_image(text:str)->str:
    pipeline = DiffusionPipeline.from_pretrained("dreamlike-art/dreamlike-photoreal-2.0")
    if(torch.cuda.is_available()):
        pipeline = pipeline.to("cuda")
    image = pipeline(
        text,
        low_cpu_mem_usage=True,
        negative_prompt="",
        num_inference_steps=7,
        guidance_scale=7.0,
    ).images[0]
    buffered = BytesIO()
    image.save(buffered, format="JPEG")
    buffered.seek(0)

    return base64.b64encode(buffered.getvalue()).decode("utf-8")

app = FastAPI(
    title="API Project",
    description="Work in progress",
    version='0.1',
    swagger_ui_parameters={"docExpansion": "none"},
)

router = APIRouter(tags=["Image"], prefix="/image")

@router.get("/{text}",response_model=str)
def read_root(
    text:str
):
    return generate_image(text)


app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"],
                   allow_credentials=True)
app.include_router(router)

if __name__ == "__main__":
    import uvicorn
    from os import getenv

    host = getenv("HOST", "0.0.0.0")
    port = int(getenv("PORT", "8089"))  # Default port is 8080 if not specified
    uvicorn.run(app, host=host, port=port)
