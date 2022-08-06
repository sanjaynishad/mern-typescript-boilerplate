import Joi from 'joi';
import { IUser } from '../interfaces';

export const loginSchema = Joi.object<IUser>().keys({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().min(6).max(20).required(),
});

export const registerSchema = Joi.object<IUser>().keys({
    firstName: Joi.string().trim().min(2).max(30).required(),
    lastName: Joi.string().trim().min(2).max(30),
    // username: Joi.string()
    //     .trim()
    //     .min(2)
    //     .max(20)
    //     .regex(/^[a-zA-Z0-9_]+$/)
    //     .required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().min(6).max(20).required(),
});