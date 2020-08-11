import { SendGroupSMSRequest, SendSMSRequest } from './../api/request';
import { BaseRoute } from './base.route';
import { ResponseCode } from '../enum';
import { AppLogger } from '../utils';
import { plainToClass } from 'class-transformer';
import { Request, Response, Router } from 'express';
import { SMSController } from '../controller';

export class SMSRoute extends BaseRoute {
    constructor(public router: Router, public smsController: SMSController) {
        super();
        this.router.post('/send-group-sms', this.sendGroupSMS);
        this.router.post('/send-sms', this.sendSMS);
    }

    private sendGroupSMS = async (request: Request, response: Response) => {
        try {
            AppLogger.info(`Send Group SMS`);
            const sendGroupSMSRequest = plainToClass(SendGroupSMSRequest, request.body);
            AppLogger.debug(sendGroupSMSRequest.prettyLog());

            const validationError = await sendGroupSMSRequest.validate();
            if (validationError) {
                response.status(ResponseCode.BAD_REQUEST).send(this.getErrorResponse(validationError, ResponseCode.BAD_REQUEST));
            }
            const returnResponse = await this.smsController.sendGroupSMS(sendGroupSMSRequest);
            response.status(returnResponse.code).send(returnResponse);
        } catch (error) {
            response.status(ResponseCode.INTERNAL_SERVER_ERROR).send(this.getErrorResponse(error));
        }
    };

    private sendSMS = async (request: Request, response: Response) => {
        try {
            AppLogger.info(`Send SMS`);
            const sendSMSRequest = plainToClass(SendSMSRequest, request.body);
            AppLogger.debug(sendSMSRequest.prettyLog());

            const validationError = await sendSMSRequest.validate();
            if (validationError) {
                response.status(ResponseCode.BAD_REQUEST).send(this.getErrorResponse(validationError, ResponseCode.BAD_REQUEST));
            }
            const returnResponse = await this.smsController.sendSMS(sendSMSRequest);
            response.status(returnResponse.code).send(returnResponse);
        } catch (error) {
            response.status(ResponseCode.INTERNAL_SERVER_ERROR).send(this.getErrorResponse(error));
        }
    };

}
