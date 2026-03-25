import { Role } from "@/types/user";

export const navigationByRole = {
    [Role.EMPLOYEE]: [
        { label: "Tasks", to: "/tasks" },
    ],
    [Role.MANAGER]: [
        { label: "Tasks", to: "/tasks" },
        { label: "Employees", to: "/employees" },
    ],
    [Role.CEO]: [
        { label: "Tasks", to: "/tasks" },
        { label: "Employees", to: "/employees" },
        { label: "System Control", to: "/system-control" },
    ],
};
