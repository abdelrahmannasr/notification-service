import { MongoValidator } from './../utils';
import { UserStatus } from '../enum';
import { Schema, Model, model } from 'mongoose';
import { IUser } from '../interface';

const UserSchema: Schema = new Schema<IUser>(
    {
        firstName: {
            type: String,
            required: [true, 'First name is required'],
            trim: true
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            index: true,
            validate: MongoValidator.Email
        },
        phoneNumber: {
            type: String,
            required: [true, 'Phone number is required'],
            trim: true
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        status: {
            type: UserStatus,
            default: UserStatus.Active
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        userDevices: [
            {
                type: Schema.Types.ObjectId,
                ref: 'UserDevice'
            }
        ],
        favLang: {
            type: Schema.Types.ObjectId,
            ref: 'Language'
        }
    },
    {
        collection: 'users',
        timestamps: true,
    }
);

const User: Model<IUser> = model<IUser>('User', UserSchema);
export default User;
