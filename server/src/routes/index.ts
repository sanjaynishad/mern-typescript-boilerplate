
import { Router } from 'express';
import apiRoutes from './api';
import authRoutes from './auth';

const appRoutes = Router();

appRoutes.use('/api', apiRoutes);
appRoutes.use('/auth', authRoutes);

export default appRoutes;
