import express from 'express';

const logoutRoutes = express.Router();

logoutRoutes.get('/', async (req, res, next) => {
    res.clearCookie('token').send(false);
});

export default logoutRoutes;
