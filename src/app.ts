import Express from 'express';
import { Container } from 'typedi';
import * as bodyparser from 'body-parser';
import { Logger, Tracer, OrmLogger } from '@adhityan/gc-logger';
import { createConnection, useContainer } from 'typeorm';
import { Router } from '@adhityan/gc-doc';
import Helmet from 'helmet';
import path from 'path';

import * as controllers from './controllers';
import * as middlewares from './middlewares';
import { ObjectUtils } from './utils';
import { Config } from './config';
import { Entities, Migrations } from './orm';

Logger.init(Config.LOGGER_CONFIG);
process.on('unhandledRejection', (reason, p) => {
    Logger.error('Unhandled Rejection for promise', p, 'reason:', reason);
});

const isDebug = () => {
    if (process.env.ENV?.includes('PROD') || process.env.ENV?.includes('prod')) return false;
    return true;
};

const initDatabase = async () => {
    const entities = <Function[]>ObjectUtils.getObjectValues(Entities);
    const migrations = <Function[]>ObjectUtils.getObjectValues(Migrations);

    Logger.info('Established database connection');
    await createConnection({
        database: path.resolve(__dirname, '../local.db'),
        entities,
        logger: new OrmLogger(),
        logging: isDebug(),
        maxQueryExecutionTime: 1000,

        migrations,
        type: 'sqlite',
    });
};

const app: Express.Application = Express();
const start = async () => {
    app.use(Tracer.expressMiddleware());
    app.use(bodyparser.json());
    app.use(Helmet());

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
                baseUrl: 'https://ATEMPLATE.adhithan.com',
            },
            enableDocumentation: true,
            middlewares: <Function[]>ObjectUtils.getObjectValues(middlewares),
            routePrefix: '/api',
        },
        Container,
    );

    app.listen(Config.PORT, () => {
        Logger.info(`Server up and running on port ${Config.PORT}`);
    });
};

start();