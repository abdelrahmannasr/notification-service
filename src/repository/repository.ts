import { Types } from "mongoose";

export class Repository {
    constructor() {}

    protected async castListOfIdsToObjectIds(ids: any[]) {
        const objectIds: Types.ObjectId[] = []
        for (const index in ids) {
            const objectId = Types.ObjectId(ids[index])
            objectIds.push(objectId);
        }
        return objectIds;
    }
}
