import { useMutation } from "@tanstack/react-query";
import { registerUser, loginUser } from "@/services/user";

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
