import { IUser } from './../interface/user.interface';
import { Repository } from './repository';
import { AppLogger } from '../utils';
import User from '../model/user.model';
require ('../model/user-device.model.ts');

export class UserRepository extends Repository {

    constructor() {
        super();
    }

    public async getUserById(userId): Promise<IUser> {
        return new Promise(async (resolve, reject) => {
            try {
                User.findById(userId)
                    .populate([{ path: 'userDevices favLang ' }])
                    .exec((error: any, user: any) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(user);
                        }
                    });
            } catch (error) {
                AppLogger.error(error);
                reject(error);
            }
        });
    }

    public async getUsersByIds(userIds): Promise<IUser[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const objectIds = await this.castListOfIdsToObjectIds(userIds);                
                User.find({ '_id': { $in: objectIds } })
                    .populate([{ path: 'userDevices favLang ' }])
                    .exec((error: any, users: any) => {
                        if (error) {userIds[1]                            
                            reject(error);
                        } else {
                            resolve(users);
                        }
                    });
            } catch (error) {
                AppLogger.error(error);
                reject(error);
            }
        });
    }

}
