import { ResponseType, ResponseContentType } from '../types';
import { httpStatusCodes, httpStatusMessages, httpResponseStatus } from '../constants';

export class ResponseUtil {
    public static success(
        { statusCode, data = null, message = null }: ResponseContentType,
        response: ResponseContentType,
    ): ResponseType {
        const status = httpResponseStatus.SUCCESS;
        response.status(statusCode);
        response.body = { api_request_id: response.reqId, data, message, status };
        return response.body;
    }

    public static fail(
        { statusCode, code, message = null }: ResponseContentType,
        response: ResponseContentType,
    ): ResponseType {
        const status = httpResponseStatus.FAILED;
        response.status(statusCode);
        response.body = { api_request_id: response.reqId, code, message, status };
        return response.body;
    }

    public static error(
        { statusCode, code, message = null }: ResponseContentType,
        response: ResponseContentType,
    ): ResponseType {
        const status = httpResponseStatus.ERROR;
        response.status(statusCode);
        response.body = { api_request_id: response.reqId, code, message, status };
        return response.body;
    }

    public static ok(params: ResponseContentType, response: ResponseContentType): ResponseType {
        return ResponseUtil.success(
            {
                ...params,
                statusCode: httpStatusCodes.OK,
            },
            response,
        );
    }

    public static created(params: ResponseContentType, response: ResponseContentType): ResponseType {
        return ResponseUtil.success(
            {
                ...params,
                statusCode: httpStatusCodes.CREATED,
            },
            response,
        );
    }

    public static accepted(params: ResponseContentType, response: ResponseContentType): ResponseType {
        return ResponseUtil.success(
            {
                ...params,
                statusCode: httpStatusCodes.ACCEPTED,
            },
            response,
        );
    }

    public static noContent(params: ResponseContentType, response: ResponseContentType): ResponseType {
        return ResponseUtil.success(
            {
                ...params,
                statusCode: httpStatusCodes.NO_CONTENT,
            },
            response,
        );
    }

    public static badRequest(params: ResponseContentType, response: ResponseContentType): ResponseType {
        return ResponseUtil.fail(
            {
                ...params,
                code: httpStatusMessages.BAD_REQUEST,
                statusCode: httpStatusCodes.BAD_REQUEST,
            },
            response,
        );
    }

    public static forbidden(params: ResponseContentType, response: ResponseContentType): ResponseType {
        return ResponseUtil.fail(
            {
                ...params,
                code: httpStatusMessages.FORBIDDEN,
                statusCode: httpStatusCodes.FORBIDDEN,
            },
            response,
        );
    }

    public static notFound(params: ResponseContentType, response: ResponseContentType): ResponseType {
        return ResponseUtil.fail(
            {
                ...params,
                code: httpStatusMessages.NOT_FOUND,
                statusCode: httpStatusCodes.NOT_FOUND,
            },
            response,
        );
    }

    public static requestTimeout(params: ResponseContentType, response: ResponseContentType): ResponseType {
        return ResponseUtil.fail(
            {
                ...params,
                code: httpStatusMessages.REQUEST_TIMEOUT,
                statusCode: httpStatusCodes.REQUEST_TIMEOUT,
            },
            response,
        );
    }

    public static unprocessableEntity(params: ResponseContentType, response: ResponseContentType): ResponseType {
        return ResponseUtil.fail(
            {
                ...params,
                code: httpStatusMessages.UNPROCESSABLE_ENTITY,
                statusCode: httpStatusCodes.UNPROCESSABLE_ENTITY,
            },
            response,
        );
    }

    public static internalServerError(params: ResponseContentType, response: ResponseContentType): ResponseType {
        return ResponseUtil.error(
            {
                ...params,
                code: httpStatusMessages.INTERNAL_SERVER_ERROR,
                statusCode: httpStatusCodes.INTERNAL_SERVER_ERROR,
            },
            response,
        );
    }

    public static notImplemented(params: ResponseContentType, response: ResponseContentType): ResponseType {
        return ResponseUtil.error(
            {
                ...params,
                code: httpStatusMessages.NOT_IMPLEMENTED,
                statusCode: httpStatusCodes.NOT_IMPLEMENTED,
            },
            response,
        );
    }

    public static badGateway(params: ResponseContentType, response: ResponseContentType): ResponseType {
        return ResponseUtil.error(
            {
                ...params,
                code: httpStatusMessages.BAD_GATEWAY,
                statusCode: httpStatusCodes.BAD_GATEWAY,
            },
            response,
        );
    }

    public static unauthorized(params: ResponseContentType, response: ResponseContentType): ResponseType {
        return ResponseUtil.fail(
            {
                ...params,
                code: httpStatusMessages.UNAUTHORIZED,
                statusCode: httpStatusCodes.UNAUTHORIZED,
            },
            response,
        );
    }
}
