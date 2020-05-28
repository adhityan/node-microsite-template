import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { Logger } from '@adhityan/gc-logger';
import { ResponseUtil } from '../utils';
import { UNKNOWN_ERROR } from '../constants';
import { RequestType, ResponseType, ResponseContentType } from '../types';

@Middleware({ type: 'after' })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
    // eslint-disable-next-line class-methods-use-this
    public async error(
        error: any,
        request: RequestType,
        response: ResponseContentType,
        next: (err?: any) => Promise<any>,
    ): Promise<ResponseType> {
        await next();

        Logger.error(
            {
                error: error.stack,
                event: 'error',
            },
            `Request failed for url: ${request.url}`,
        );

        return response.send(ResponseUtil.internalServerError(UNKNOWN_ERROR, response));
    }
}
