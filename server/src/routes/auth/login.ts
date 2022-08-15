import express from 'express';
import { AppConst } from '../../app-const';
import { IAppRequest } from '../../interfaces/IAppRequest';
import { IAppResponse } from '../../interfaces/IAppResponse';
import { userService } from '../../services/user.service';
import { sendBadRequestResponse, sendNotFoundResponse } from '../../utils/app-reponse';
import { createJwtToken } from '../../utils/auth';

const loginRoutes = express.Router();

loginRoutes.post('/', async (req: IAppRequest, res: IAppResponse) => {
    const email = req.body.email;
    const password = req.body.password;

    const userDoc = await userService.findByEmail(email);
    if (!userDoc) {
        return sendNotFoundResponse(res, 'Email is not registered with us.');
    }

    if (!userDoc.comparePassword(password)) {
        return sendBadRequestResponse(res, 'Password is wrong.');
    }

    const plainObject = userDoc.toObject();
    delete plainObject.password;
    const token = createJwtToken(plainObject);
    res
        .cookie('token', token, { httpOnly: true, maxAge: AppConst.jwtMaxAge })
        .status(200)
        .json({
            data: { token }
        });
});

export default loginRoutes;
