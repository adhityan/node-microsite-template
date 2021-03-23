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
     * Redirect host path
     */
     public HOST = process.env.HOST || 'https://adhityan.in.ngrok.io';

     /**
      * MySQL DB Host
      */
     public DB_HOST: string = process.env.DB_HOST || '';
 
     /**
      * MySQL DB Port
      */
     public DB_PORT: number = parseInt(process.env.DB_PORT || '3306', 10);
 
     /**
      * MySQL DB Username
      */
     public DB_USERNAME: string = process.env.DB_USERNAME || '';
 
     /**
      * MySQL DB Password
      */
     public DB_PASSWORD: string = process.env.DB_PASSWORD || '';
 
     /**
      * MySQL DB Database
      */
     public DB_DATABASE: string = process.env.DB_DATABASE || 'insta';
 
     /**
      * Database table prefix
      */
     public DB_TABLE_PREFIX: string = process.env.DB_TABLE_PREFIX || '';
}
