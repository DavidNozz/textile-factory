export enum Gender {
    MALE = "Male",
    FEMALE = "Female",
}

export enum Role {
    EMPLOYEE = "Employee",
    MANAGER = "Manager",
    CEO = "CEO",
}

export interface CreateUserModel {
    personalId: string
    name: string
    username: string
    password: string
    gender: Gender
    dob: string
    role: Role
    managerId?: string | null
    isBlocked: boolean
}

export interface UserCredentialsModel {
    username: string
    password: string
}

export interface UserModel {
    id: string
    personalId: string
    name: string
    username: string
    password: string
    gender: Gender
    dob: string
    role: Role
    managerId?: string | null
    isBlocked: boolean
}
