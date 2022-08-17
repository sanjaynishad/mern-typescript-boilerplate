import { getUrlQueryString, isRunningOnLocalhost } from "../app-utils";
import { ModelBase, User } from "../models";

interface IAppRuntimeCache {
    me?: User,
    token: string | null;
}

export class ApiBase<T extends ModelBase> {
    protected cache: IAppRuntimeCache = {
        token: localStorage.getItem('token')
    };

    constructor(
        private entityType: new () => T,
        private endpoint = '',
        private urlPrefix = 'api',
        private host = isRunningOnLocalhost() ? 'http://localhost:8080' : ''
    ) { }

    protected get baseUrl() {
        return `${this.host}/${this.urlPrefix}`;
    };

    async getAllOrDefault(query = {}): Promise<Array<T> | any> {
        let url = this.endpoint;
        const queryString = getUrlQueryString(query);
        if (queryString) {
            url += '?' + queryString;
        }

        const response = await this.get(url);
        return await response.json() || {};
    }

    async getOneById(id: string): Promise<T> {
        const response = await this.get(`${this.endpoint}/${id}`);
        return Object.assign(new this.entityType(), await response.json());
    }

    async save(entity: T): Promise<T | undefined> {
        let response;
        if (entity._id) {
            // update
            response = await this.put(`${this.endpoint}/${entity._id}`, entity);
        } else {
            // add
            response = await this.post(this.endpoint, entity);
        }

        if (response && response.status === 200) {
            return Object.assign(new this.entityType(), await response.json());
        }
    }

    async deleteOne(entity: T): Promise<T | undefined> {
        if (!entity?._id) {
            return;
        }

        const response = await this.deleteRequest(`${this.endpoint}/${entity._id}`, entity);
        return Object.assign(new this.entityType(), await response.json());
    }

    protected headers() {
        const requestHeaders = new Headers();
        requestHeaders.set('Content-Type', 'application/json');
        if (this.cache.token) {
            requestHeaders.set('x-access-token', this.cache.token);
        }

        return requestHeaders;
    }

    protected async get(url: string) {
        return await fetch(`${this.baseUrl}/${url}`, {
            headers: this.headers()
        });
    }

    protected async post(url: string, jsonBody: any) {
        return await fetch(`${this.baseUrl}/${url}`, {
            body: JSON.stringify(jsonBody),
            method: 'POST',
            headers: this.headers()
        });
    }

    protected async put(url: string, jsonBody: any) {
        return await fetch(`${this.baseUrl}/${url}`, {
            body: JSON.stringify(jsonBody),
            method: 'PUT',
            headers: this.headers()
        });
    }

    protected async deleteRequest(url: string, jsonBody: any) {
        return await fetch(`${this.urlPrefix}/${url}`, {
            body: JSON.stringify(jsonBody),
            method: 'DELETE',
            headers: this.headers()
        });
    }
}
