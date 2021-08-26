import { Client } from 'pg';
import DbConnection from '../DbWorker';
import CreateNewRefresh from '../../types/CreateNewRefresh';
import Create from '../Actions/CreateRefreshToken';
import DeleteActionOnUserId from '../Actions/DeleteActionOnUserId';
import GetByRefreshTokenAction from '../Actions/GetByRefreshTokenAction';

import Action from '../Actions/Action';
import AfterCreateRefresh from '../../types/AfterCreateRefresh';
import DeleteRefreshOnId from '../../types/DeleteRefreshOnId';
import GetByRefreshToken from '../../types/GetByRefreshToken';
import ReturnGetBeRefreshToken from '../../types/ReturnGetBeRefreshToken';
import DeleteByRefresh from '../../types/DeleteByRefresh';

import DeleteByRefreshAction from '../Actions/DeleteByRefreshAction';

class RefreshSessions {
    private tableName: string = 'refresh_sessions';
    private connect: Client;

    private id: string = 'id';
    private refreshToken: string = 'refresh_token';
    private expiresIn: string = 'expires_in';
    private userId: string = 'user_id';
    private createdAt: string = 'created_at';

    private createAction: Action;
    private deleteActionOnUserId: Action;
    private getByRefreshTokenAction: Action;
    private deleteByRefreshAction: Action;

    constructor() {
        this.connect = DbConnection.connect();

        this.createAction = new Create({
            tableName: this.tableName,
            id: this.id,
            refreshToken: this.refreshToken,
            expiresIn: this.expiresIn,
            userId: this.userId,
            createdAt: this.createdAt,
            connect: this.connect,
        });

        this.deleteActionOnUserId = new DeleteActionOnUserId({
            connect: this.connect,
            tableName: this.tableName,
            userId: this.userId,
        });

        this.getByRefreshTokenAction = new GetByRefreshTokenAction({
            connect: this.connect,
            tableName: this.tableName,
            refreshToken: this.refreshToken,
        });

        this.deleteByRefreshAction = new DeleteByRefreshAction({
            connect: this.connect,
            tableName: this.tableName,
            refreshToken: this.refreshToken,
        });
    }

    async create({
        expiresin,
        userId,
        refreshToken,
    }: CreateNewRefresh): Promise<AfterCreateRefresh> {
        return (await this.createAction.doAction({
            expiresin,
            userId,
            refreshToken,
        })) as AfterCreateRefresh;
    }

    async deleteOnUserId({ id }: DeleteRefreshOnId) {
        await this.deleteActionOnUserId.doAction({ id });
    }

    async getByRefreshToken({
        refreshToken,
    }: GetByRefreshToken): Promise<ReturnGetBeRefreshToken> {
        return (await this.getByRefreshTokenAction.doAction({
            refreshToken,
        })) as ReturnGetBeRefreshToken;
    }

    async deleteByRefresh({ refreshToken }: DeleteByRefresh) {
        await this.deleteByRefreshAction.doAction({
            refreshToken,
        });
    }
}

export default RefreshSessions;
