import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Logger } from '@adhityan/gc-logger';
import { UNKNOWN_ENDPOINT, httpStatusCodes } from '../constants';

import { GenericResponse } from '../models';

@Middleware({ type: 'after' })
export class ResponseLoggerMiddleware implements ExpressMiddlewareInterface {
    // eslint-disable-next-line class-methods-use-this
    public use(request: Express.Request, response: Express.Response): void {
        if (!response.headersSent) {
            response.status(httpStatusCodes.NOT_FOUND);
            response.send(new GenericResponse(UNKNOWN_ENDPOINT.message, UNKNOWN_ENDPOINT.statusCode));
            response.end();
        }

        const responseTime = new Date().getTime() - response.startTime.getTime();
        Logger.info(`Response took ${responseTime}ms with status code ${response.statusCode}`);
    }
}
