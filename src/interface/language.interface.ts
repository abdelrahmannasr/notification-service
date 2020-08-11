import { Document } from 'mongoose';

export interface ILanguage extends Document {
    isoCode: string;
    name: string;
    default: boolean;
    createdAt: Date;
    updatedAt: Date;
}
