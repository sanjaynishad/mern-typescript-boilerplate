
import { Router } from 'express';
import profileRoutes from './profile';
import userRoutes from './users';

const router = Router();

router.get('/', (req, res) => {
    res.send('Healthy!');
});

router.use('/profile', profileRoutes);
router.use('/users', userRoutes);

export default router;
