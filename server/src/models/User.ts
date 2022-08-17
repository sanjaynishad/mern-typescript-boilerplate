import * as bcrypt from 'bcrypt';

import { IToken, IUser, Role } from './../interfaces';
import mongoose, { Document, FlatRecord, Model, Query, Schema } from 'mongoose';

interface IUserMethods {
    comparePassword(password: string): boolean;
    getFullName(): string;
}

interface IUserQueryHelpers {
    withPassword: <T extends Query<any, FlatRecord<IUser>, {}, FlatRecord<IUser>>>(this: T) => T;
}

interface IUserModel extends Model<IUser, IUserQueryHelpers, IUserMethods> {
}

// Define the User Schema
const userSchema = new Schema<IUser, IUserModel, IUserMethods, IUserQueryHelpers>({
    email: { type: String, unique: true },
    firstName: String,
    lastName: String,
    role: { type: String, default: Role.User, enum: Role },
    password: { type: String, select: false },
    passwordResetToken: { type: String },
    passwordResetExpires: Date,

    // OAuth profile ids
    facebook: { type: String },
    twitter: { type: String },
    google: { type: String },
    github: { type: String },
    linkedin: { type: String },

    tokens: Array<IToken>,

    address: Object,
    gender: { type: String },
    avatar: { type: String }
}, {
    timestamps: true,
});

// Password hash middleware
userSchema.pre('save', function (next) {
    const user = this;
    if (!user.password || !user.isModified('password')) {
        return next();
    }

    bcrypt.hash(user.password, 10, (err, hashedPassword) => {
        if (err) {
            next(err);
            return;
        }

        user.password = hashedPassword;
        next();
    });
});

// Custom Methods
// Compares the user's password with the request password
userSchema.methods.comparePassword = function (requestPassword: string): boolean {
    return bcrypt.compareSync(requestPassword, this.password);
};

userSchema.method('getFullName', function () {
    return `${this.firstName} ${this.lastName}`;
});

// query helper
userSchema.query.withPassword = function () {
    return this.select('+password');
}

// Custom statics
// userSchema.statics.

export type UserDocument = Document<any, any, IUser> & IUser & {
    _id: mongoose.Types.ObjectId;
} & IUserMethods;

const User = mongoose.model('User', userSchema);
export default User;
