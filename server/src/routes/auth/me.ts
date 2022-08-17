import express from 'express';
import { IAppRequest } from '../../interfaces';
import { userService } from '../../services/user.service';
import { sendUnauthorizedResponse } from '../../utils/app-reponse';

const meRoutes = express.Router();

meRoutes.get('/', async (req: IAppRequest, res, next) => {
    if (!req.user?._id) {
        return sendUnauthorizedResponse(res);
    }

    let user = await userService.getById(req.user._id)
    if (!user) {
        return res.status(401).send({});
    }

    user = user.toObject();
    delete user.tokens;
    res.json(user);
});

export default meRoutes;
