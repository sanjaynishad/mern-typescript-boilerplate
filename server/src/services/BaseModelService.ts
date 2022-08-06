import { Document, Model } from "mongoose";
import { logError } from "../utils/loggers";

export class BaseModelService<TModel extends Model<any, any, any>, TDocument extends Document> {

    constructor(model: TModel) {
        this.Model = model;
    }

    protected Model: TModel;

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
}
