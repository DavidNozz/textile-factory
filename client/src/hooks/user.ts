import { useMutation } from "@tanstack/react-query";
import { registerUser, loginUser, updateProfile } from "@/services/userApi";
import type { UpdateUserModel } from "@/types/user";

interface UpdateProfileParams {
    _id: string
    payload: UpdateUserModel
}

export function useRegister() {
    return useMutation({
        mutationFn: registerUser,
    });
}

export function useLogin() {
    return useMutation({
        mutationFn: loginUser,
    });
}

export function useUpdateProfile() {
    return useMutation({
        mutationFn: ({_id, payload}: UpdateProfileParams) => updateProfile(_id, payload)
    });
}
