import { BaseRequest } from "./base-request";
import { MultiLangFieldInput } from "./multi-lang-field-input";
import { IsArray, IsDefined } from "class-validator";
import { Type } from "class-transformer";

export class SendSMSRequest extends BaseRequest {
    
    @IsArray()
    @IsDefined()
    @Type(() => MultiLangFieldInput)
    public messages: MultiLangFieldInput[];

    @IsArray()
    @IsDefined()
    public userId: string;
}