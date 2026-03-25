import { api } from "@/services/api";
import type { CreateUserModel, UpdateUserModel, UserCredentialsModel, UserModel } from "@/types/user";

export async function registerUser(payload: CreateUserModel): Promise<UserModel> {
    const response = await api.post<UserModel>("/users/register", payload);
    return response.data;
}

export async function loginUser(payload: UserCredentialsModel): Promise<UserModel> {
    const response = await api.post<UserModel>("/users/login", payload);
    return response.data;
}

export async function updateProfile(_id: string, payload: UpdateUserModel): Promise<UserModel> {
    const response = await api.put<UserModel>(`/users/${_id}`, payload);
    return response.data;
}
