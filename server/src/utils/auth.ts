import * as jwt from 'jsonwebtoken';
import { AppConst } from '../app-const';
import { IUser } from '../interfaces/models';
import { logger } from './loggers';


export function verifyJwtToken(token: string): IUser | undefined {
    if (!AppConst.jwtSecret) {
        return;
    }

    try {
        return jwt.verify(token, AppConst.jwtSecret) as IUser;
    } catch (err) {
        logger.error(err);
    }
}

export function createJwtToken(userInfo: IUser) {
    if (!AppConst.jwtSecret) {
        logger.error('JWT_SECRET is not found with process.env');
        return;
    }

    return jwt.sign(userInfo, AppConst.jwtSecret, {
        expiresIn: AppConst.jwtMaxAge,
        algorithm: 'HS256'
    });
}
