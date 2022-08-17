import express from 'express';
import { IAppRequest, IAppResponse } from '../../interfaces';
import { isAdmin } from '../../middlewares/auth';
import { userService } from '../../services/user.service';

const userRoutes = express.Router();

userRoutes.use(isAdmin);

userRoutes.get('/', async (req: IAppRequest, res: IAppResponse) => {
    const users = await userService.getAll() || [];
    res.json({
        data: users.filter(u => u.id !== req.user?._id),
    });
});

export default userRoutes;
