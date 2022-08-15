import { IModelBase, Role } from "../interfaces/models";
import { ApiBase } from "./ApiBase";

export class AuthApi extends ApiBase<IModelBase> {
    constructor() {
        super(IModelBase, '', 'auth');
    }

    async register(reqData: any) {
        const response = await this.post('register', reqData);
        return await response.json();
    }

    async login(email: string, password: string) {
        const response = await this.post('login', {
            email,
            password
        });

        const res = await response.json();
        if (res?.data?.token) {
            this.cache.token = res.data.token;
            if (this.cache.token) {
                localStorage.setItem('token', this.cache.token);
            }

            return true;
        }

        return false;
    }

    async me() {
        if (!this.cache.token) {
            return;
        }

        if (this.cache.me) {
            return this.cache.me;
        }

        // TODO: store in localStorage with timespan and prevent calling API multiple times
        const response = await this.get('me');
        if (response.status === 401) {
            this.logout("/");
            return;
        }

        this.cache.me = await response.json();
        return this.cache.me;
    }

    logout(redirectUrl?: string) {
        this.cache.token = null;
        localStorage.removeItem('token');
        if (redirectUrl) {
            window.location.href = redirectUrl;
        }
    }

    isLoggedIn() {
        return !!this.cache.token;
    }

    isAdmin() {
        return this.isLoggedIn() && this.cache.me?.role === Role.Admin;
    }
}

export const authProvider = new AuthApi();
