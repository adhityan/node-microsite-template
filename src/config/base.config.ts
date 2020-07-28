import * as path from 'path';

import { LoggerOptions } from '@adhityan/gc-logger/lib/types';

export abstract class BaseConfig {
    /**
     * This key is used in generating session token
     */
    public PORT: number = parseInt(process.env.PORT || '9000', 10);

    /**
     * Configuration setting for the GC Logger
     */
    public LOGGER_CONFIG: LoggerOptions = {
        exitOnError: false,
        level: 'debug',
        type: 'console',
    };

    /**
     * SQLite DB connection variables
     */
    public DB_PATH: string = path.resolve(__dirname, '../../db');
}
