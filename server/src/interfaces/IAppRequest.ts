import { Request } from "express";
import { IUser } from "./models";

export interface IAppRequest extends Request {
    user?: IUser;
}