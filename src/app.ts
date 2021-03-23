/* eslint-disable @typescript-eslint/ban-types */
import Express from 'express';
import {  useContainer } from 'typeorm';
import gracefulShutdown from 'http-graceful-shutdown';
import { Container } from 'typedi';

import { Logger, Tracer } from '@adhityan/gc-logger';
import { Router } from '@adhityan/gc-doc';

import { ObjectUtils } from './utils';
import { Config } from './config';
import * as controllers from './controllers';
import * as middlewares from './middlewares';
import { authorizationChecker, currentUserChecker } from './middlewares/authentication.middleware';
import { initDatabase } from './utils/env.util';

Logger.init(Config.LOGGER_CONFIG);
process.on('unhandledRejection', (reason, p) => {
    Logger.error('Unhandled rejection occuured', p, 'reason:', reason);
});

Container.set('Config', Config);
useContainer(Container);

const start = async () => {
    const app: Express.Application = Express();
    app.use(Tracer.expressMiddleware());
    
    await initDatabase();

    Router.initialize(
        app,
        {
            authorizationChecker: authorizationChecker,
            controllers: <Function[]>ObjectUtils.getObjectValues(controllers),
            cors: {
                allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
                exposeHeaders: ['X-Request-Id'],
                origin: '*',
            },
            currentUserChecker: currentUserChecker,
            defaultErrorHandler: false,
            defaults: {
                nullResultCode: 404,
                paramOptions: {
                    required: true,
                },
                undefinedResultCode: 404,
            },
            documentationParameters: {
                baseUrl: process.env.HOST || '',
                title: 'Runmatrix Core Service',
            },
            enableDocumentation: true,
            middlewares: <Function[]>ObjectUtils.getObjectValues(middlewares),
            routePrefix: '/',
        },
        Container,
    );

    const server = app.listen(Config.PORT, () => {
        Logger.info(`Server up and running on port ${Config.PORT}`);
    });

    gracefulShutdown(server);
};

start();
