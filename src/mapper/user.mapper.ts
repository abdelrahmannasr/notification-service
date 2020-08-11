import { IUser } from '../interface';
import { UserResponse } from '../api/response';
import { IMapper } from "./mapper";

export class UserMapper implements IMapper<UserResponse> {
    public toClient(source: IUser): UserResponse {
        const client: UserResponse = {
            id: source._id,
            firstName: source.firstName,
            lastName: source.lastName,
            email: source.email,
            phoneNumber: source.phoneNumber,
            isVerified: source.isVerified
        };
        return client;
    }

    public toListClient(source: IUser[]): UserResponse[] {
        const list: UserResponse[] = [];
        if (source) {
            source.forEach(element => {
                list.push(this.toClient(element));
            });
        }
        return list;
    }
}