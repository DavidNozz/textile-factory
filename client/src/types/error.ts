export type FastApiError = {
    msg?: string;
};

export type FastApiErrorResponse = {
    detail?: string | FastApiError[];
}
