import User, { UserDocument } from "../models/User";
import { logError } from "../utils/loggers";
import { BaseModelService } from "./BaseModelService";

class UserService extends BaseModelService<typeof User, UserDocument> {
    constructor() {
        super(User);
    }

    async findByEmail(email: string) {
        if (!email) {
            return;
        }

        return await this.Model
            .findOne({ email })
            .withPassword()
            .catch(logError);
    }

    async emailExist(email: string) {
        const user = await this.Model.findOne({ email }).catch(logError);
        return !!user;
    }
}

export const userService = new UserService();
