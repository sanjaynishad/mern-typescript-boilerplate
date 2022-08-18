import { IUser } from "../interfaces";
import User, { UserDocument } from "../models/User";
import { logError } from "../utils/loggers";
import { registerSchema } from "../utils/validators";
import { BaseModelService } from "./BaseModelService";

class ProfileService extends BaseModelService<typeof User, UserDocument> {
    constructor() {
        super(User);
    }

    async registerUser(body: any) {
        const data = registerSchema.validate(body, {
            allowUnknown: true
        });
        if (data.error) {
            return {
                error: {
                    message: data.error.message
                }
            };
        }

        const user = new User(data.value);
        const u = await user.save().catch(logError);
        if (!u) {
            return;
        }

        delete u.password;
        return {
            data: u.toObject()
        };
    }

    async updateProfile(reqUser: IUser, profileData: any) {
        if (!reqUser?._id) {
            return;
        }

        const $set: any = {};
        const allowedUsersField = ['firstName', 'lastName', 'email', 'phone', 'address'];
        allowedUsersField.map(key => {
            if (profileData[key] !== undefined) {
                $set[key] = profileData[key];
            }
        });

        const user = await User.findByIdAndUpdate(reqUser._id, {
            $set
        }, {
            new: true,
            useFindAndModify: false
        }).catch(logError);

        return user?.toObject();
    }

    async updatePassword(reqUser: IUser, body: any) {
        if (!reqUser?._id || !body?.password || !body.newPassword) {
            return;
        }

        const user = await this.getById(reqUser._id);
        if (!user) {
            return;
        }

        if (!user.comparePassword(body.password)) {
            return {
                success: false,
                message: 'Current password is wrong.'
            }
        }

        user.password = body.newPassword;
        const u = await user.save().catch(logError);
        if (!u) {
            return;
        }

        return {
            success: true
        };
    }
}

export const profileService = new ProfileService();
