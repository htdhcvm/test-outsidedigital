import Action from './Action';
import { Client } from 'pg';
import GetByRefreshToken from '../../types/GetByRefreshToken';
import ReturnGetBeRefreshToken from '../../types/ReturnGetBeRefreshToken';

type PropsFindByEmail = {
    tableName: string;
    refreshToken: string;
    connect: Client;
};

class GetByRefreshTokenAction implements Action {
    private tableName: string;
    private refreshToken: string;
    private connect: Client;

    constructor({ tableName, connect, refreshToken }: PropsFindByEmail) {
        this.tableName = tableName;
        this.connect = connect;
        this.refreshToken = refreshToken;
    }

    doAction({
        refreshToken,
    }: GetByRefreshToken): Promise<ReturnGetBeRefreshToken> {
        return new Promise((resolve, reject) => {
            this.connect.query(
                `
                SELECT * FROM ${this.tableName} WHERE ${this.refreshToken}=$1
            `,
                [refreshToken],
                (err, res) => {
                    if (err) return reject(err);
                    if (res.rowCount === 0) return resolve(null);
                    resolve({
                        id: res.rows[0].id,
                        refresh_token: res.rows[0].refresh_token,
                        expires_in: res.rows[0].expires_in,
                        user_id: res.rows[0].user_id,
                        created_at: res.rows[0].created_at,
                    });
                }
            );
        });
    }
}

export default GetByRefreshTokenAction;
