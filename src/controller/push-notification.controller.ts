import { AppLogger } from './../utils/app-logger';
import { BaseController } from './base.controller';
import { UserRepository } from '../repository';
import { IResponse } from '../api/response';
import { SendGroupPushNotificationRequest, SendPushNotificationRequest } from '../api/request';
import { IUserDevice } from '../interface';

export class PushNotificationController extends BaseController {

    constructor(private userRepository: UserRepository) {
        super();
    }

    public async sendGroupPushNotification(request: SendGroupPushNotificationRequest): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                const users = await this.userRepository.getUsersByIds(request.userIds);
                users.forEach(async user => {
                    const message = request.messages.find(msg => msg.languageId === user.favLang.id);
                    if (message) {
                       await this.sendPushNotificationMessage(user.userDevices, message.value);
                    }
                });
                resolve(this.getResponseBody('', `Group push notification sent successfully`));
            } catch (error) {
                reject(error);
            }
        });
    }

    public async sendPushNotification(request: SendPushNotificationRequest): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await this.userRepository.getUserById(request.userId);
                const message = request.messages.find(msg => msg.languageId === user.favLang.id);
                if (message) {
                    await this.sendPushNotificationMessage(user.userDevices, message.value);
                }
                resolve(this.getResponseBody('', `Push notification sent successfully`));
            } catch (error) {
                reject(error);
            }
        });
    }

    private async sendPushNotificationMessage(userDevices: IUserDevice[], messageBody: string) {
        // Integrate with any push notification service like FCM
        userDevices.forEach(device => {
            AppLogger.info(`Send push notification to ${device.notificationToken}, message body is ${messageBody}`)
        });
    }
}
