import Action from './Action';
import { Client } from 'pg';
import GetByRefreshToken from '../../types/GetByRefreshToken';
import ReturnGetBeRefreshToken from '../../types/ReturnGetBeRefreshToken';
import DeleteByRefresh from '../../types/DeleteByRefresh';

type PropsFindByEmail = {
    tableName: string;
    refreshToken: string;
    connect: Client;
};

class DeleteByRefreshAction implements Action {
    private tableName: string;
    private refreshToken: string;
    private connect: Client;

    constructor({ tableName, connect, refreshToken }: PropsFindByEmail) {
        this.tableName = tableName;
        this.connect = connect;
        this.refreshToken = refreshToken;
    }

    doAction({ refreshToken }: DeleteByRefresh): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connect.query(
                `
                DELETE FROM ${this.tableName} WHERE ${this.refreshToken}=$1
            `,
                [refreshToken],
                (err, res) => {
                    if (err) return reject(err);
                    resolve();
                }
            );
        });
    }
}

export default DeleteByRefreshAction;
