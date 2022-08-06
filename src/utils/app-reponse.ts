import { IAppResponse } from "../interfaces";

export function sendSuccessResponse(res: IAppResponse, data: any, message?: string) {
    res.send({
        data,
        message: message
    });
}

export function sendUnauthorizedResponse(res: IAppResponse, message?: string) {
    res.status(401).send({
        error: {
            code: 401,
            message: message || 'You are not autherized for this request.'
        }
    });
}

export function sendErrorResponse(res: IAppResponse, message?: string, code?: number) {
    res.status(500).send({
        error: {
            code: code || 500,
            message: message || 'You are not autherized for this request.'
        }
    });
}

export function sendNotFoundResponse(res: IAppResponse, message?: string, code?: number) {
    res.status(404).send({
        error: {
            code: code || 500,
            message: message || 'Not found.'
        }
    });
}

export function sendBadRequestResponse(res: IAppResponse, message?: string, code?: number) {
    res.status(400).send({
        error: {
            code: code || 500,
            message: message || 'Bad Request.'
        }
    });
}
