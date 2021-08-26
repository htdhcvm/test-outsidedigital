import { Client } from 'pg';
import DbConnection from '../DbWorker';
import CreateNewRefresh from '../../types/CreateNewRefresh';
import Create from '../Actions/CreateRefreshToken';
import Action from '../Actions/Action';
import AfterCreateRefresh from '../../types/AfterCreateRefresh';

class RefreshSessions {
    private tableName: string = 'refresh_sessions';
    private connect: Client;

    private id: string = 'id';
    private refreshToken: string = 'refresh_token';
    private expiresIn: string = 'expires_in';
    private userId: string = 'user_id';
    private createdAt: string = 'created_at';

    createAction: Action;

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
}

export default RefreshSessions;
