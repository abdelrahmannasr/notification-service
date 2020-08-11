import { IUser } from './../interface/user.interface';
import { Repository } from './repository';
import { AppLogger } from '../utils';
import User from '../model/user.model';

export class UserRepository extends Repository {

    constructor() {
        super();
    }

    public async getUserById(userId): Promise<IUser> {
        return new Promise(async (resolve, reject) => {
            try {
                User.findById(userId)
                    .populate([{ path: 'favLang userDevices' }])
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
                    .populate([{ path: 'favLang userDevices' }])
                    .exec((error: any, users: any) => {
                        if (error) {
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

    public async searchForUser(text): Promise<IUser[]> {
        return new Promise(async (resolve, reject) => {
            try {
                User.find({ $or: [{ firstName: { $regex: text, $options: 'i' } }, { lastName: { $regex: text, $options: 'i' } }, { email: { $regex: text, $options: 'i' } }] })
                    .select({ _id: 1, firstName: 1, lastName: 1 })
                    .exec((error: any, users: any) => {
                        if (error) {
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
