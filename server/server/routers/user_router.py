from uuid import uuid4
from fastapi import APIRouter, HTTPException
from http import HTTPStatus
from server.config.database import users_db
from server.models.user_models import CreateUserModel, UserCredentialsModel, UserModel

user_router = APIRouter(prefix="/users")


@user_router.post("/register", response_model=UserModel, status_code=HTTPStatus.CREATED)
async def register_user(user: CreateUserModel):
    new_user_dict = user.model_dump()

    for existing_user in users_db.values():
        if existing_user["username"] == new_user_dict["username"]:
            raise HTTPException(status_code=HTTPStatus.BAD_REQUEST, detail="Username already exists")
        if existing_user["personal_id"] == new_user_dict["personal_id"]:
            raise HTTPException(status_code=HTTPStatus.BAD_REQUEST, detail="Personal ID already exists")

    new_user_id = str(uuid4())
    new_user_dict["id"] = new_user_id

    users_db[new_user_id] = new_user_dict
    return new_user_dict


@user_router.post("/login", response_model=UserModel)
async def login_user(user_credentials: UserCredentialsModel):
    user_credentials_dict = user_credentials.model_dump()

    for existing_user in users_db.values():
        if existing_user["username"] == user_credentials_dict["username"] and existing_user["password"] == user_credentials_dict["password"]:
            if existing_user["is_blocked"]:
                raise HTTPException(status_code=HTTPStatus.FORBIDDEN, detail="User is blocked")
            return existing_user

    raise HTTPException(status_code=HTTPStatus.UNAUTHORIZED, detail="Invalid username or password")
