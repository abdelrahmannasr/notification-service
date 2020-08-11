import { IResponse } from './response';
import { ResponseCode } from '../../enum';

export class BaseResponse {
    protected getErrorResponse(error: any, statusCode?: number): IResponse {
        const response: IResponse = { code: statusCode ? statusCode : ResponseCode.INTERNAL_SERVER_ERROR, message: error ? error : 'internal server error' };
        return response;
    }

    protected getResponseBody(bodyData: any, message: string = '', statusCode: number = ResponseCode.OK): IResponse {
        const response: IResponse = { code: statusCode, message: message, data: bodyData };
        return response;
    }
}
