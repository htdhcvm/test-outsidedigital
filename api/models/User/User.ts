import { Client } from 'pg';
import DbConnection from '../DbWorker';
import Action from '../Actions/Action';
import DeleteUser from '../../types/Models/User/DeleteUser';
import GetTagsUser from '../Actions/DeleteUserOnId';
import {
    PropsCheckEmailNickname,
    ReturnCheckEmailNickname,
} from '../../types/Models/User/CheckOnEmailAndNickName';
import CheckOnEmailAndNickName from '../Actions/CheckOnEmailAndNickName';
import {
    PropsInComeUpdateUser,
    ReturnDataUpdateUser,
} from '../../types/Models/User/UpdateData';
import UpdateData from '../Actions/UpdateData';
import {
    PropInComeGetUserOnId,
    ReturnGetUserOnId,
} from '../../types/Models/User/GetUserOnId';

import GetUserOnId from '../Actions/GetUserOnId';

class User {
    private connect: Client;
    private getByNameAction: Action;

    private tableName: string = 'user_outside';
    private uid: string = 'uid';
    private email: string = 'email';
    private password: string = 'password';
    private nickname: string = 'nickname';

    private getTagsUserAction: Action;
    private checkOnEmailAndNickNameAction: Action;
    private updateDataAction: Action;
    private getUserOnIdAction: Action;

    constructor() {
        this.connect = DbConnection.connect();
        this.getTagsUserAction = new GetTagsUser({
            tableName: this.tableName,
            connect: this.connect,
        });

        this.checkOnEmailAndNickNameAction = new CheckOnEmailAndNickName({
            tableName: this.tableName,
            connect: this.connect,
            email: this.email,
            nickname: this.nickname,
            uid: this.uid,
        });

        this.updateDataAction = new UpdateData({
            tableName: this.tableName,
            connect: this.connect,
            uid: this.uid,
            email: this.email,
            password: this.password,
            nickname: this.nickname,
        });

        this.getUserOnIdAction = new GetUserOnId({
            tableName: this.tableName,
            connect: this.connect,
            uid: this.uid,
        });
    }

    async deleteUserOnId({ userId }: DeleteUser): Promise<void> {
        await this.getTagsUserAction.doAction({ userId });
    }

    async checkOnEmailAndNickName({
        email,
        nickname,
    }: PropsCheckEmailNickname): Promise<ReturnCheckEmailNickname> {
        return (await this.checkOnEmailAndNickNameAction.doAction({
            email,
            nickname,
        })) as ReturnCheckEmailNickname;
    }

    async updateData({
        userId,
        email,
        password,
        nickname,
    }: PropsInComeUpdateUser): Promise<ReturnDataUpdateUser> {
        return (await this.updateDataAction.doAction({
            userId,
            email,
            password,
            nickname,
        })) as ReturnDataUpdateUser;
    }

    async getUserOnId({
        userId,
    }: PropInComeGetUserOnId): Promise<ReturnGetUserOnId> {
        return (await this.getUserOnIdAction.doAction({
            userId,
        })) as ReturnGetUserOnId;
    }
}

export default User;
