
import apiClient from "./apiClient";

export type LoginCredentials = {
    email: string;
    password: string;
};
export interface RegisterCredentials {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    token: string;
};

export const loginUser = async (credentials: LoginCredentials): Promise<User> => {
    const { data } = await apiClient.post("/api/login", credentials);
    return data;
};

export const registerUser = async (credentials: RegisterCredentials): Promise<User> => {
    const { data } = await apiClient.post("/api/register", credentials);
    return data;
};

export const logoutUser = async () => {
    return await apiClient.delete("/api/set-cookies")
}