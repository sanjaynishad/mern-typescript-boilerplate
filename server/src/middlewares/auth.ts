import { NextFunction } from "express";
import { IAppRequest, IAppResponse } from "../interfaces";
import { Role } from "../interfaces/models";
import { sendUnauthorizedResponse } from "../utils/app-reponse";
import { verifyJwtToken } from "../utils/auth";

export function isAuthenticated(req: IAppRequest, res: IAppResponse, next: NextFunction) {
    if (req.user?._id) {
        return next();
    }

    sendUnauthorizedResponse(res);
}

export function isAdmin(req: IAppRequest, res: IAppResponse, next: NextFunction) {
    const user = req.user;
    if (user && user.role === Role.Admin) {
        return next();
    }

    sendUnauthorizedResponse(res);
}

export function authorize(req: IAppRequest, res: IAppResponse, next: NextFunction) {
    const token =
        req.body?.token ||
        req.query?.token ||
        req.headers['x-access-token'] ||
        req.cookies?.token;

    if (token) {
        const decoded = verifyJwtToken(token);
        if (!decoded) {
            sendUnauthorizedResponse(res);
            return;
        }

        req.user = decoded;
        res.locals.user = decoded;
    }

    next();
}
