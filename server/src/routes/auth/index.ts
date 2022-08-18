
import { Router } from 'express';
import { isAuthenticated } from '../../middlewares/auth';
import googleRoutes from './google';
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
authRoutes.use('/login/google', googleRoutes);
authRoutes.use('/logout', logoutRoutes);

authRoutes.use('/me', isAuthenticated, meRoutes);

export default authRoutes;
