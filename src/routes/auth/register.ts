import express from 'express';
import { IAppResponse } from '../../interfaces/IAppResponse';
import { profileService } from '../../services/profile.service';
import { userService } from '../../services/user.service';
import { sendBadRequestResponse, sendSuccessResponse } from '../../utils/app-reponse';

const registerRoutes = express.Router();

registerRoutes.post('/', async (req, res: IAppResponse, next) => {
    if (await userService.emailExist(req.body && req.body.email)) {
        return sendBadRequestResponse(res, 'Email already exist.');
    }

    const user = await profileService.registerUser(req.body);
    if (!user) {
        return res.status(500).send({});
    }

    sendSuccessResponse(res, null, 'Profile created successfully! Please check your email.');
});

export default registerRoutes;
