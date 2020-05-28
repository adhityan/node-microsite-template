export type ResponseType = {
    status?: string;
    data?: any;
    message?: string;
    request_id?: string;
    code?: string;
};

export type ResponseContentType = {
    [key: string]: any;
};
