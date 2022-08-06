import { Response } from "express";

interface IErrorResponseBody {
    code?: number;
    message?: string;
}

interface AppResponseBody {
    data?: { [key: string]: any } | any[];
    message?: string;
    error?: IErrorResponseBody;
}

export interface IAppResponse extends Response<AppResponseBody> {
}
