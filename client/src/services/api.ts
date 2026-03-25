import axios, { AxiosError } from "axios";
import humps from "humps";
import type { FastApiErrorResponse } from "@/types/error";

export const api = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    if (config.data) {
        config.data = humps.decamelizeKeys(config.data);
    }

    if (config.params) {
        config.params = humps.decamelizeKeys(config.params);
    }

    return config;
});

api.interceptors.response.use(
    (response) => {
        if (response.data) {
            response.data = humps.camelizeKeys(response.data);
        }
        return response;
    },
    (error: AxiosError<FastApiErrorResponse>) => {
        return Promise.reject(new Error(extractErrorMessage(error)));
    },
);

function extractErrorMessage(error: AxiosError<FastApiErrorResponse>) {
    const detail = error.response?.data?.detail;

    if (typeof detail === "string") {
        return detail;
    }

    if (Array.isArray(detail) && detail.length > 0 && detail[0]?.msg) {
        return detail[0].msg!;
    }

    return error.message || "Something went wrong";
}
