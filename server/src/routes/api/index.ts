
import { Router } from 'express';
import profileRoutes from './profile';

const router = Router();

router.get('/', (req, res) => {
    res.send('Healthy!');
});

router.use('/profile', profileRoutes);

export default router;
