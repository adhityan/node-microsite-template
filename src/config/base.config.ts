// Load environment variables from .env file
import { config as loadEnvConfig } from 'dotenv';
import { LoggerOptions } from '@adhityan/gc-logger/lib/types';

loadEnvConfig();

export abstract class BaseConfig {
    /**
     * This key is used in generating session token
     */
    public PORT: number = parseInt(process.env.PORT || '9000', 10);

    public LOGGER_CONFIG: LoggerOptions = {
        exitOnError: false,
        level: 'debug',
        type: 'console',
    };
}
