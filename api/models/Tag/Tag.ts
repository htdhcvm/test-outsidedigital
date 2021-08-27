import { Client } from 'pg';
import DbConnection from '../DbWorker';
import {
    ReturnGetByName,
    ParamsInCome,
} from '../../types/Models/Tag/ReturnGetByName';
import Action from '../Actions/Action';
import GetByNameAction from '../Actions/GetByNameAction';
import ParamsInComeCreate from '../../types/Models/Tag/Create';
import Create from '../Actions/Create';
import DTOServerTag from '../../DTO/server/PostTag';
import InComeDeleteOnId from '../../types/Models/Tag/DeleteOnId';
import {
    InComeGetAllTegOnUser,
    ReturnDataGetAll,
} from '../../types/Models/Tag/GetAllInIdUser';

import DeleteOnIdAction from '../Actions/DeleteOnIdAction';
import GetAllInIdUserAction from '../Actions/GetAllInIdUserAction';
import {
    PropInComeUpdateTagData,
    ReturnUpdateTagData,
} from '../../types/Models/Tag/UpdateTagData';
import UpdateTagData from '../Actions/UpdateTagData';

class Tag {
    private connect: Client;

    private tableName: string = 'tag';
    private id: string = 'id';
    private creator: string = 'creator';
    private name: string = 'name';
    private sortOrder: string = 'sort_order';

    private getByNameAction: Action;
    private createAction: Action;

    private deleteOnIdAction: Action;
    private getAllInIdUserAction: Action;
    private updateTagDataAction: Action;

    constructor() {
        this.connect = DbConnection.connect();
        this.getByNameAction = new GetByNameAction({
            tableName: this.tableName,
            connect: this.connect,
            name: this.name,
        });

        this.createAction = new Create({
            tableName: this.tableName,
            connect: this.connect,
            name: this.name,
            creator: this.creator,
            sortOrder: this.sortOrder,
            id: this.id,
        });

        this.deleteOnIdAction = new DeleteOnIdAction({
            tableName: this.tableName,
            connect: this.connect,
            creator: this.creator,
            id: this.id,
        });
        this.getAllInIdUserAction = new GetAllInIdUserAction({
            tableName: this.tableName,
            connect: this.connect,
            creator: this.creator,
        });

        this.updateTagDataAction = new UpdateTagData({
            tableName: this.tableName,
            connect: this.connect,
            creator: this.creator,
            id: this.id,
            name: this.name,
            sortOrder: this.sortOrder,
        });
    }

    async getByName({ name }: ParamsInCome): Promise<ReturnGetByName> {
        return (await this.getByNameAction.doAction({
            name,
        })) as ReturnGetByName;
    }

    async create({
        name,
        sortOrder,
        userId,
    }: ParamsInComeCreate): Promise<DTOServerTag> {
        return (await this.createAction.doAction({
            name,
            sortOrder,
            userId,
        })) as DTOServerTag;
    }

    async deleteOnId({ id, userId }: InComeDeleteOnId) {
        await this.deleteOnIdAction.doAction({ id, userId });
    }

    async getAllInIdUser({
        userId,
    }: InComeGetAllTegOnUser): Promise<ReturnDataGetAll> {
        return (await this.getAllInIdUserAction.doAction({
            userId,
        })) as ReturnDataGetAll;
    }

    async updateTagData({
        userId,
        id,
        name,
        sortOrder,
    }: PropInComeUpdateTagData): Promise<ReturnUpdateTagData> {
        return (await this.updateTagDataAction.doAction({
            userId,
            id,
            name,
            sortOrder,
        })) as ReturnUpdateTagData;
    }
}

export default Tag;
