import { IsNotEmpty, IsMongoId, Validate } from 'class-validator';
import { IsNotBlank } from '../../utils';

export class MultiLangFieldInput {

    @IsMongoId()
    @IsNotEmpty()
    public languageId: string;

    @Validate(IsNotBlank)
    @IsNotEmpty()
    public value: string;
}
