import express from 'express';
import { IAppRequest, IAppResponse } from '../../interfaces';
import { isAuthenticated } from '../../middlewares/auth';
import { profileService } from '../../services/profile.service';
import { userService } from '../../services/user.service';
import { sendErrorResponse, sendUnauthorizedResponse } from '../../utils/app-reponse';

const profileRoutes = express.Router();

profileRoutes.use(isAuthenticated);

profileRoutes.get('/', async (req: IAppRequest, res: IAppResponse) => {
    if (!req.user?._id) {
        return sendUnauthorizedResponse(res);
    }

    const user = await userService.getById(req.user._id);
    if (!user) {
        return sendUnauthorizedResponse(res, 'Requested profile is not found!');
    }

    res.json({
        data: user,
    });
});

profileRoutes.post('/', async (req: IAppRequest, res: IAppResponse) => {
    if (!req.user?._id) {
        return sendUnauthorizedResponse(res);
    }

    const updatedUser = await profileService.updateProfile(req.user, req.body);
    if (!updatedUser) {
        return sendErrorResponse(res, 'Failed to update profile. Please try after sometime.');
    }

    res.json({
        data: updatedUser
    });
});

export default profileRoutes;
