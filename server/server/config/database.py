from datetime import datetime
from uuid import uuid4
from server.models.user_models import Gender, Role

users_db = {}


def ensure_ceo_exists():
    does_ceo_exist = any(user["role"] == Role.CEO for user in users_db.values())

    if does_ceo_exist:
        return

    ceo_id = str(uuid4())

    users_db[ceo_id] = {
        "id": ceo_id,
        "personal_id": "000000000",
        "name": "Default CEO",
        "username": "CEO",
        "password": "CEO123123",
        "gender": Gender.MALE,
        "dob": datetime.min,
        "role": Role.CEO,
        "manager_id": None,
        "is_blocked": False,
    }
