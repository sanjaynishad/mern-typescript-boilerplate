import { ErrorRequestHandler, NextFunction, Request, RequestHandler, Response } from 'express';
import { IAppResponse } from '../interfaces/IAppResponse';
import { sendNotFoundResponse } from '../utils/app-reponse';
import { logger } from '../utils/loggers';

// =========== error middleware ============

// error handler
export const handleAppRouteError: ErrorRequestHandler = (error: any, req: Request, res: IAppResponse, next: NextFunction) => {
    const status = error.status || 500;
    logger.error(error.message);

    if (req.accepts('html')) {
        // serve a 500.html 
    }

    res.status(status).json({ error: { message: 'Something went wrong', code: status } });
}

// 404 handler
export const appRouteNotFound: RequestHandler = (req: Request, res: IAppResponse, next: NextFunction) => {
    if (req.accepts('html')) {
        // serve a 404.html
    }

    sendNotFoundResponse(res);
}
