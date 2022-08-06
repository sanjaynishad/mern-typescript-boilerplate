
import { Router } from 'express';
import loginRoutes from './login';
import logoutRoutes from './logout';
import registerRoutes from './register';

const authRoutes = Router();

authRoutes.post('/register', registerRoutes);
authRoutes.post('/login', loginRoutes);
authRoutes.post('/logout', logoutRoutes);

export default authRoutes;
