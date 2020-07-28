/* eslint-disable @typescript-eslint/ban-types */
import Express from 'express';
import { createConnection, useContainer } from 'typeorm';
import gracefulShutdown from 'http-graceful-shutdown';
import { Container } from 'typedi';

import { Logger, Tracer, OrmLogger } from '@adhityan/gc-logger';
import { Router } from '@adhityan/gc-doc';

import { ObjectUtils } from './utils';
import { Config } from './config';
import { Entities, Migrations } from './orm';
import * as controllers from './controllers';
import * as middlewares from './middlewares';

Logger.init(Config.LOGGER_CONFIG);
process.on('unhandledRejection', (reason, p) => {
    Logger.error('Unhandled Rejection recorded', p, 'reason:', reason);
});

const isDebug = () => {
    if (process.env.NODE_ENV?.includes('PROD') || process.env.NODE_ENV?.includes('prod')) return false;
    return true;
};

/**
 * Initialize the SQLite connection
 */
const initDatabase = async () => {
    const entities = <Function[]>ObjectUtils.getObjectValues(Entities);
    const migrations = <Function[]>ObjectUtils.getObjectValues(Migrations);

    Logger.info('Established database connection');
    await createConnection({
        database: `${Config.DB_PATH}/local.sqlite`,
        entities,
        logger: new OrmLogger(),
        logging: isDebug() ? 'all' : ['error'],
        maxQueryExecutionTime: 1000,
        migrations,
        synchronize: isDebug(),
        type: 'sqlite',
    });

    Logger.info('Database connection successful');
};

const app: Express.Application = Express();

const start = async () => {
    app.use(Tracer.expressMiddleware());

    Container.set('Config', Config);
    useContainer(Container);
    await initDatabase();

    Router.initialize(
        app,
        {
            controllers: <Function[]>ObjectUtils.getObjectValues(controllers),
            cors: {
                allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
                exposeHeaders: ['X-Request-Id'],
                origin: '*',
            },
            defaultErrorHandler: false,
            defaults: {
                nullResultCode: 404,
                paramOptions: {
                    required: true,
                },
                undefinedResultCode: 404,
            },
            documentationParameters: {
                baseUrl: 'https://ATEMPLATE.gamechange.dev',
            },
            enableDocumentation: true,
            middlewares: <Function[]>ObjectUtils.getObjectValues(middlewares),
            routePrefix: '/api',
        },
        Container,
    );

    const server = app.listen(Config.PORT, () => {
        Logger.info(`Server up and running on port ${Config.PORT}`);
    });

    gracefulShutdown(server);
};

start();
