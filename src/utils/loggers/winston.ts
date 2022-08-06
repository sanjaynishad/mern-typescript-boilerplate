'use strict';

import * as path from 'path';
import winston, { Logger, format, createLogger } from 'winston';
import { IsDevelopment } from '../../app-const';

/* options based on NODE_ENV */
const options: winston.LoggerOptions = IsDevelopment ? {
    level: 'debug',
    silent: false,
} : {
    level: process.env.LOG_LEVEL || 'info',
    silent: false,
};

const logFile = process.env.LOG_FILE || 'winston.log';
const logFilePath = path.join(__dirname, '../../../logs/', logFile);

/**
 * creates a Winston logger
 * format : timestamp & JSON
 * transports : Console & file
 */
export const logger: Logger = createLogger({
    transports: [
        new winston.transports.Console({
            ...options
        }),
        new winston.transports.File({
            ...options,
            filename: logFilePath,
        }),
    ],
    format: format.combine(
        format.timestamp(),
        format.colorize(),
        format.json(),
    ),
});

export function logError(message: any) {
    logger.error(message);
}
