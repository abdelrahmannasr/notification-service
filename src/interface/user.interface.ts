import { Document } from 'mongoose';
import { UserStatus } from '../enum';
import { IUserDevice, ILanguage } from '.';

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    status: UserStatus;
    isVerified: boolean;
    userDevices: IUserDevice[];
    favLang: ILanguage
}
