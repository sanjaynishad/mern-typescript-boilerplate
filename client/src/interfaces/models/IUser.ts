import { IModelBase } from "./IModelBase";

export const Role = Object.freeze({
    User: 'user',
    Admin: 'admin'
} as const);

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Role = typeof Role[keyof typeof Role];

export interface IUser extends IModelBase {
    email?: string;
    password?: string;
    role?: Role;
    firstName?: string;
    lastName?: string;
    phone?: string;
}
