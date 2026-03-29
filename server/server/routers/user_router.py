from http import HTTPStatus
from uuid import uuid4
from fastapi import APIRouter, HTTPException
from server.config.database import users_db
from server.models.user_models import CreateUserModel, UserCredentialsModel, UpdateUserModel, UserModel, Role

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

    if new_user_dict["role"] in (Role.EMPLOYEE, Role.MANAGER):
        ceo = next((user for user in users_db.values() if user["role"] == Role.CEO))
        new_user_dict["manager_id"] = ceo["id"]

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


@user_router.put("/{_id}", response_model=UserModel)
async def update_profile(_id: str, updated_profile: UpdateUserModel):
    if _id not in users_db:
        raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail="User not found")

    updated_profile_dict = updated_profile.model_dump()
    current_user = users_db[_id]

    for existing_id, existing_user in users_db.items():
        if existing_id != _id:
            if existing_user["username"] == updated_profile_dict["username"]:
                raise HTTPException(status_code=HTTPStatus.BAD_REQUEST, detail="Username already exists")
            if existing_user["personal_id"] == updated_profile_dict["personal_id"]:
                raise HTTPException(status_code=HTTPStatus.BAD_REQUEST, detail="Personal ID already exists")

    updated_user = {
        "id": _id,
        "personal_id": updated_profile_dict["personal_id"],
        "name": updated_profile_dict["name"],
        "username": updated_profile_dict["username"],
        "password": updated_profile_dict["password"],
        "gender": updated_profile_dict["gender"],
        "dob": updated_profile_dict["dob"],
        "role": current_user["role"],
        "manager_id": current_user["manager_id"],
        "is_blocked": current_user["is_blocked"],
    }

    users_db[_id] = updated_user
    return updated_user
