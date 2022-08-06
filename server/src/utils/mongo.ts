import mongoose = require("mongoose");
import { AppConst } from "../app-const";
import { logger } from './loggers';

/**
 * initialise mongoDB connection
 */
export const connectToMongoDb = (callback: (err: string | null) => void) => {
    /* remove deprecated options */
    // mongoose.set('useCreateIndex', true);
    // mongoose.set('useFindAndModify', false);

    if (!AppConst.mongoUri) {
        callback(`MONGO_URI not found with environment variables.`);
        return;
    }

    /* connect */
    mongoose.connect(
        AppConst.mongoUri,
        {},
        (connectErr) => {
            if (connectErr) {
                logger.error(`Error while connecting to MongoDB: ${connectErr}`);
                return process.exit(0);
            }

            logger.debug('Connected to MongoDB');
            callback(null);

            /* close mongo connection on SIGINT */
            mongoose.connection.on('error', err => logger.error(`MongoDB error: ${err}`));
            process.on('SIGINT', () => {
                mongoose.connection.close(() => {
                    return process.exit(0);
                });
            });
        },
    );
};
