from enum import Enum
from pydantic import BaseModel
from datetime import datetime
from typing import Optional


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
    personal_id: Optional[str] = None
    name: Optional[str] = None
    username: Optional[str] = None
    password: Optional[str] = None
    gender: Optional[Gender] = None
    dob: Optional[datetime] = None


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
