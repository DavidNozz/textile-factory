from datetime import datetime
from enum import Enum
from typing import Optional
from pydantic import BaseModel


class Gender(str, Enum):
    MALE = "Male"
    FEMALE = "Female"


class Role(str, Enum):
    EMPLOYEE = "Employee"
    MANAGER = "Manager"
    CEO = "CEO"


class CreateUserModel(BaseModel):
    personal_id: str
    name: str
    username: str
    password: str
    gender: Gender
    dob: datetime = datetime.min
    role: Role = "Employee"
    manager_id: Optional[str] = None
    is_blocked: bool = False


class UserCredentialsModel(BaseModel):
    username: str
    password: str


class UpdateUserModel(BaseModel):
    personal_id: str
    name: str
    username: str
    password: str
    gender: Gender
    dob: datetime


class UserModel(BaseModel):
    id: Optional[str] = None
    personal_id: str
    name: str
    username: str
    password: str
    gender: Gender
    dob: datetime = datetime.min
    role: Role = "Employee"
    manager_id: Optional[str] = None
    is_blocked: bool = False
