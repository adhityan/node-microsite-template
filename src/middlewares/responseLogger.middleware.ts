import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Logger } from '@adhityan/gc-logger';
import { ResponseUtil } from '../utils';
import { UNKNOWN_ENDPOINT, httpStatusCodes } from '../constants';

import { RequestType, ResponseContentType } from '../types';

@Middleware({ type: 'after' })
export class ResponseLoggerMiddleware implements ExpressMiddlewareInterface {
    // eslint-disable-next-line class-methods-use-this
    public async use(request: RequestType, response: ResponseContentType): Promise<any> {
        if (!response.headersSent) {
            response.status(httpStatusCodes.NOT_FOUND);
            response.send(ResponseUtil.notFound(UNKNOWN_ENDPOINT, response));
        }
        response.responseTime = new Date().getTime() - response.startTime.getTime();
        Logger.info(`Response took ${response.responseTime}ms with status code ${response.statusCode}`);
        response.end();
    }
}
