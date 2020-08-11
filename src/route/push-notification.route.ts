import { SendGroupPushNotificationRequest, SendPushNotificationRequest } from './../api/request';
import { BaseRoute } from './base.route';
import { ResponseCode } from '../enum';
import { AppLogger } from '../utils';
import { plainToClass } from 'class-transformer';
import { Request, Response, Router } from 'express';
import { PushNotificationController } from '../controller';

export class PushNotificationRoute extends BaseRoute {
    constructor(public router: Router, public pushNotificationController: PushNotificationController) {
        super();
        this.router.post('/send-group-push-notification', this.sendGroupPushNotification);
        this.router.post('/send-push-notification', this.sendPushNotification);
    }

    private sendGroupPushNotification = async (request: Request, response: Response) => {
        try {
            AppLogger.info(`Send Group PushNotification`);
            const sendGroupPushNotificationRequest = plainToClass(SendGroupPushNotificationRequest, request.body);
            AppLogger.debug(sendGroupPushNotificationRequest.prettyLog());

            const validationError = await sendGroupPushNotificationRequest.validate();
            if (validationError) {
                response.status(ResponseCode.BAD_REQUEST).send(this.getErrorResponse(validationError, ResponseCode.BAD_REQUEST));
            }
            const returnResponse = await this.pushNotificationController.sendGroupPushNotification(sendGroupPushNotificationRequest);
            response.status(returnResponse.code).send(returnResponse);
        } catch (error) {
            response.status(ResponseCode.INTERNAL_SERVER_ERROR).send(this.getErrorResponse(error));
        }
    };

    private sendPushNotification = async (request: Request, response: Response) => {
        try {
            AppLogger.info(`Send PushNotification`);
            const sendPushNotificationRequest = plainToClass(SendPushNotificationRequest, request.body);
            AppLogger.debug(sendPushNotificationRequest.prettyLog());

            const validationError = await sendPushNotificationRequest.validate();
            if (validationError) {
                response.status(ResponseCode.BAD_REQUEST).send(this.getErrorResponse(validationError, ResponseCode.BAD_REQUEST));
            }
            const returnResponse = await this.pushNotificationController.sendPushNotification(sendPushNotificationRequest);
            response.status(returnResponse.code).send(returnResponse);
        } catch (error) {
            response.status(ResponseCode.INTERNAL_SERVER_ERROR).send(this.getErrorResponse(error));
        }
    };

}
