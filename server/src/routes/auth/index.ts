
import { Router } from 'express';
import { isAuthenticated } from '../../middlewares/auth';
import loginRoutes from './login';
import logoutRoutes from './logout';
import meRoutes from './me';
import registerRoutes from './register';

const authRoutes = Router();

authRoutes.get('/', (req, res) => {
    res.send('Healthy!');
});

authRoutes.use('/register', registerRoutes);
authRoutes.use('/login', loginRoutes);
authRoutes.use('/logout', logoutRoutes);

authRoutes.use('/me', isAuthenticated, meRoutes);

export default authRoutes;
