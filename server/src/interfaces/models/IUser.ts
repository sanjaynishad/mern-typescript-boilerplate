// DO NOT USE ENUM
// Do not use TypeScript enums as when these are transpiled to JavaScript they create a function
// that has to be called, this creates an unnecessary hit to performance.
export const Role = Object.freeze({
    Admin: "admin",
    User: "user"
} as const);

export type Role = typeof Role[keyof typeof Role];

export interface IToken {
    kind: string;
    accessToken: string;
    tokenSecret?: string;
}

export interface IAddress {
    l1: string;
    l2?: string;
    city: string;
    state: string;
    country: string;
    zip: string;
    lat?: string;
    lng?: string;
}

export interface IUser {
    _id?: string;
    email: string;
    password?: string;
    role: Role;
    passwordResetToken: string;
    passwordResetExpires: Date;

    // OAuth profile ids
    facebook: string;
    twitter: string;
    google: string;
    github: string;
    linkedin: string;

    tokens?: IToken[];

    firstName: string;
    lastName: string;
    gender: string;
    address: IAddress;

    avatar: string;
}
