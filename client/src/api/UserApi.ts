import { User } from "../models";
import { ApiBase } from "./ApiBase";

export class UserApi extends ApiBase<User> {
    constructor() {
        super(User, 'users');
    }
}

export const userApi = new UserApi();
