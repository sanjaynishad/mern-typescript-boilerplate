import express from 'express';
import { AppConst } from '../../app-const';
import { IUser, Role } from '../../interfaces';
import { IAppRequest } from '../../interfaces/IAppRequest';
import { IAppResponse } from '../../interfaces/IAppResponse';
import { getGoogleOAuthProfile } from '../../oauth/google-auth';
import { profileService } from '../../services/profile.service';
import { userService } from '../../services/user.service';
import { sendUnauthorizedResponse } from '../../utils/app-reponse';
import { createJwtToken } from '../../utils/auth';

const googleRoutes = express.Router();

googleRoutes.post('/', async (req: IAppRequest, res: IAppResponse) => {
    try {
        const profile = await getGoogleOAuthProfile(req.body.code);

        if (!profile?.email
            || !profile.given_name
            || !profile.family_name
            || !profile.picture) {
            return sendUnauthorizedResponse(res);
        }

        let user = await userService.findByEmail(profile.email);

        // if user exist return jwt token
        if (user?.email) {
            const plainObject = user.toObject();
            delete plainObject.password;
            return sendSuccessResponse(res, plainObject);
        }

        // if user is not saved into db, just save it
        const u: IUser = {
            email: profile.email,
            firstName: profile.given_name,
            lastName: profile.family_name,
            avatar: profile.picture,
            google: profile.sub,
            role: Role.User,
        };

        let newUserRes = await profileService.registerUser(u);
        if (newUserRes?.data?.email) {
            return sendSuccessResponse(res, newUserRes.data);
        }
    } catch (e) {
        console.log(e);
        sendUnauthorizedResponse(res);
    }

    sendUnauthorizedResponse(res);
});

function sendSuccessResponse(res: IAppResponse, user: IUser) {
    const token = createJwtToken(user);
    res
        .cookie('token', token, { httpOnly: true, maxAge: AppConst.jwtMaxAge })
        .status(200)
        .json({
            data: { token }
        });
}

export default googleRoutes;
