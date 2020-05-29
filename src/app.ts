import Express from 'express';
import { Container } from 'typedi';
import * as bodyparser from 'body-parser';
import { Logger, Tracer } from '@adhityan/gc-logger';
import { Router } from '@adhityan/gc-doc';
import * as controllers from './controllers';
import * as middlewares from './middlewares';
import { ObjectUtils } from './utils';
import { Config } from './config';

Logger.init(Config.LOGGER_CONFIG);
process.on('unhandledRejection', (reason, p) => {
    Logger.error('Unhandled Rejection for promise', p, 'reason:', reason);
});

const app: Express.Application = Express();
const start = async () => {
    app.use(Tracer.expressMiddleware());
    app.use(bodyparser.json());

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

    app.listen(Config.PORT, () => {
        Logger.info(`Server up and running on port ${Config.PORT}`);
    });
};

start();
