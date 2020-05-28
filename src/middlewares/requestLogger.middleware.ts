import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Logger } from '@adhityan/gc-logger';
import { RequestType, ResponseContentType } from '../types';

@Middleware({ type: 'before' })
export class RequestLoggerMiddleWare implements ExpressMiddlewareInterface {
    // eslint-disable-next-line class-methods-use-this
    public async use(
        request: RequestType,
        response: ResponseContentType,
        next: (err?: any) => Promise<any>,
    ): Promise<any> {
        response.startTime = new Date();
        Logger.info(`Request ${request.url}`);
        await next();
    }
}
