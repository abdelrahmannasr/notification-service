import { AppLogger } from './../utils/app-logger';
import { SendGroupSMSRequest } from './../api/request/send-group-sms.request';
import { BaseController } from './base.controller';
import { UserRepository } from '../repository';
import { IResponse } from '../api/response';
import { SendSMSRequest } from '../api/request';

export class SMSController extends BaseController {

    constructor(private userRepository: UserRepository) {
        super();
    }

    public async sendGroupSMS(request: SendGroupSMSRequest): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                const users = await this.userRepository.getUsersByIds(request.userIds);                
                users.forEach(async user => {
                    const message = request.messages.find(msg => msg.languageId === user.favLang.id);
                    if (message) {
                        await this.sendSMSMessage(user.phoneNumber, message.value);
                    }
                });
                resolve(this.getResponseBody('', `Group SMS sent successfully`));
            } catch (error) {
                reject(error);
            }
        });
    }

    public async sendSMS(request: SendSMSRequest): Promise<IResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await this.userRepository.getUserById(request.userId);
                const message = request.messages.find(msg => msg.languageId === user.favLang.id);
                if (message) {
                   await this.sendSMSMessage(user.phoneNumber, message.value);
                }
                resolve(this.getResponseBody('', `SMS sent successfully`));
            } catch (error) {
                reject(error);
            }
        });
    }

    private async sendSMSMessage(phoneNumber: string, messageBody: string) {
        // Integrate with any sms service provider
        AppLogger.info(`Send message to ${phoneNumber}, message body is ${messageBody}`)
    }
}
