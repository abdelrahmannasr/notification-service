import { OsType, DeviceStatus } from "../enum";
import { Document } from 'mongoose';

export interface IUserDevice extends Document {
    version: string;
    osType: OsType;
    deviceId: string;
    notificationToken: string;
    osVersion: string;
    deviceModel: string;
    status: DeviceStatus;
    accessToken: string;
    createdAt: Date;
    updatedAt: Date;
    lastLoginDate: Date;
}