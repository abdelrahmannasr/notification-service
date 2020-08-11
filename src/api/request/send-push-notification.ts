import { BaseRequest } from "./base-request";
import { MultiLangFieldInput } from "./multi-lang-field-input";
import { IsArray, IsDefined } from "class-validator";
import { Type } from "class-transformer";

export class SendPushNotificationRequest extends BaseRequest {
    
    @IsArray()
    @IsDefined()
    @Type(() => MultiLangFieldInput)
    public messages: MultiLangFieldInput[];

    @IsDefined()
    public userId: string;
}