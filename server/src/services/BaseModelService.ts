import mongoose, { Document, Model, PaginateResult } from "mongoose";
import { PaginationParameters } from "mongoose-paginate-v2";
import { logError } from "../utils/loggers";

export class BaseModelService<TModel extends Model<any, any, any>, TDocument extends Document> {

    constructor(model: TModel) {
        this.Model = model as TModel & mongoose.PaginateModel<TDocument>;
    }

    protected Model: TModel & mongoose.PaginateModel<TDocument>;
    protected allowedFieldsToUpdate: (keyof TDocument)[] | '*' = [];

    /**
     * get the entity by id.
     * @param id entity id
     * @returns entity {TSchema}
     */
    async getById(id: string): Promise<TDocument | undefined> {
        if (!id) {
            return;
        }

        return await this.Model.findById(id).catch(logError);
    }

    /**
     * get the entity by id.
     * @param id entity id
     * @returns entity {TSchema}
     */
    async deleteById(id: string): Promise<TDocument | undefined> {
        if (!id) {
            return;
        }

        return await this.Model.deleteOne({ _id: id }).catch(logError);
    }

    /**
     * update the entity.
     * @param id entity id
     * @param entity entity to update
     * @returns entity {TSchema}
     */
    async updateOne(
        id: string,
        entity: any,
        allowedFieldsToUpdate?: (keyof TDocument)[] | '*',
        populate?: string | mongoose.PopulateOptions): Promise<TDocument | undefined> {

        if (!allowedFieldsToUpdate) {
            allowedFieldsToUpdate = this.allowedFieldsToUpdate;
        }

        if (!id || !allowedFieldsToUpdate.length) {
            return;
        }

        let $set: any = {};
        if (allowedFieldsToUpdate === "*") {
            $set = entity;
        } else {
            (allowedFieldsToUpdate || allowedFieldsToUpdate).map(key => {
                if (entity[key] != undefined) {
                    $set[key] = entity[key];
                }
            });
        }

        return await this.Model.findByIdAndUpdate(id, {
            $set
        }, {
            new: true,
            useFindAndModify: false,
            populate: populate
        }).catch(logError);
    }

    async create(data: any): Promise<TDocument | undefined> {
        return await this.Model.create(data).catch(logError);
    }

    /**
     * Get all entities with a query.
     * @param query mongo db query for the entity
     * @returns list of entities. e.g. Users
     */
    async getAll(query: Record<string, any> = {}, populate?: string | mongoose.PopulateOptions | mongoose.PopulateOptions[]): Promise<PaginateResult<TDocument> | undefined | void> {
        if (!this.Model.paginate) {
            logError(`paginate plugin is not attached with ${this.Model.collection.name} model.`);
            return;
        }

        let sort: any = { createdAt: -1 };
        if (query.sortField) {
            sort = {};
            sort[query.sortField] = query.sortOrder === 'descend' ? 1 : -1;
        }

        const q: Record<string, any> = { ...query, ...this.buildGetAllQuery(query) };
        if (typeof q.isActive === 'string') {
            q.isActive = q.isActive === 'true' ? true : false;
        } else if (Array.isArray(q.isActive?.length)) {
            delete q.isActive;
        }

        return await this.Model.paginate(q, {
            ...new PaginationParameters({ query }).getOptions(),
            customLabels: {
                docs: 'data',
                meta: 'meta'
            },
            leanWithId: true,
            sort: sort,
            populate: populate || this.populateRef()
        }).catch(logError);
    }

    async getOneByQuery(query: Record<string, any> = {}, populate?: mongoose.PopulateOptions | mongoose.PopulateOptions[]): Promise<TDocument | undefined> {
        const q = { ...query, ...this.buildGetAllQuery(query) };
        return await this.Model.findOne(q).populate(populate);
    }

    /**
     * Get All Query override builder.
     * @param query query by API
     * @returns return modified mongo query based on the requirments, e.g. with Regex, handling dates etc.
     */
    protected buildGetAllQuery(query: Record<string, any> = {}): Record<string, any> {
        return {
            isActive: true
        };
    }

    protected populateRef(): mongoose.PopulateOptions | undefined {
        return;
    }
}
