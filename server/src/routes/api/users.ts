import express from 'express';
import { IAppRequest, IAppResponse } from '../../interfaces';
import { isAdmin } from '../../middlewares/auth';
import { userService } from '../../services/user.service';

const userRoutes = express.Router();

userRoutes.use(isAdmin);

userRoutes.get('/', async (req: IAppRequest, res: IAppResponse) => {
    const paginateResult = await userService.getAll(req.query) || {};
    res.json({
        ...paginateResult
    });
});

userRoutes.get('/:id', async (req: IAppRequest, res: IAppResponse) => {
    const user = await userService.getById(req.params.id) || [];
    res.json({
        data: user
    });
});

userRoutes.put('/:id', async (req: IAppRequest, res: IAppResponse) => {
    const user = await userService.updateOne(req.params.id, req.body, "*") || [];
    res.json({
        data: user
    });
});

userRoutes.delete('/:id', async (req: IAppRequest, res: IAppResponse) => {
    const user = await userService.deleteById(req.params.id) || [];
    res.json({
        data: user
    });
});

export default userRoutes;
