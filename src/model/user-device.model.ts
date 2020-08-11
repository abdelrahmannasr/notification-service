import { DeviceStatus } from '../enum';
import { Schema, Model, model } from 'mongoose';
import { IUserDevice } from '../interface';

export const UserDeviceSchema: Schema = new Schema<IUserDevice>(
    {
        version: { type: String, trim: true },
        osType: { type: String, trim: true },
        deviceId: { type: String, required: [true, 'required'], unique: true, index: true },
        notificationToken: { type: String, required: [true, 'required'], trim: true },
        osVersion: { type: String, required: [true, 'required'] },
        deviceModel: { type: String },
        status: { type: DeviceStatus, default: DeviceStatus.Active }
    },
    {
        collection: 'userDevices',
        timestamps: true
    }
);

const UserDevice: Model<IUserDevice> = model<IUserDevice>('UserDevice', UserDeviceSchema);
export default UserDevice;
