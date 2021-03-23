import { Logger, OrmLogger } from '@adhityan/gc-logger';
import { createConnection } from 'typeorm';

import { Config } from '../config';
import { ObjectUtils } from './object.util';
import { Entities, Migrations } from '../orm';

export const isDebug = (): boolean => {
    // if (process.env.NODE_ENV?.includes('PROD') || process.env.NODE_ENV?.includes('prod')) return false;
    return true;
};

/**
 * Initialize the SQLite connection
 */
export const initDatabase = async (): Promise<void> => {
    const entities = ObjectUtils.getObjectValues(Entities);
    const migrations = ObjectUtils.getObjectValues(Migrations);

    Logger.info('Establishing database connection...');
    await createConnection({
        // charset: 'utf8mb4',
        database: Config.DB_DATABASE,
        entities,
        entityPrefix: Config.DB_TABLE_PREFIX,
        host: Config.DB_HOST,
        logger: new OrmLogger(),
        logging: isDebug() ? 'all' : ['error'],
        maxQueryExecutionTime: 1000,
        migrations,
        password: Config.DB_PASSWORD,
        port: Config.DB_PORT,
        synchronize: isDebug(),
        type: 'mariadb',
        username: Config.DB_USERNAME,
    }).then(() => {
        Logger.info('Database connection success');
        return true;
    });
};
