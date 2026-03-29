from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from server.config.database import ensure_ceo_exists
from server.routers.user_router import user_router

app = FastAPI()


@app.on_event("startup")
def startup_event():
    ensure_ceo_exists()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router)
