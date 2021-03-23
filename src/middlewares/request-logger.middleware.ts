import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Logger } from '@adhityan/gc-logger';

@Middleware({ type: 'before' })
export class RequestLoggerMiddleWare implements ExpressMiddlewareInterface {
    // eslint-disable-next-line class-methods-use-this
    public async use(
        request: Express.Request,
        response: Express.Response,
        next: () => Promise<unknown>,
    ): Promise<unknown> {
        response.startTime = new Date();
        Logger.info(`Request ${request.url}`);
        return next();
    }
}
