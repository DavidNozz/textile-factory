import type { UserModel } from "@/types/user";

export function getCurrentUser(): UserModel | null {
    const rawUser = localStorage.getItem("user");

    if (!rawUser) {
        return null;
    }

    try {
        return JSON.parse(rawUser) as UserModel;
    } catch {
        return null;
    }
}

export function setCurrentUser(user: UserModel) {
    localStorage.setItem("user", JSON.stringify(user));
}
