import Action from './Action';
import { Client } from 'pg';

import {
    PropInComeGetUserOnId,
    ReturnGetUserOnId,
} from '../../types/Models/User/GetUserOnId';

type Props = {
    tableName: string;
    uid: string;
    connect: Client;
};

class GetUserOnId implements Action {
    private tableName: string;
    private uid: string;
    private connect: Client;

    constructor({ tableName, connect, uid }: Props) {
        this.connect = connect;
        this.tableName = tableName;
        this.uid = uid;
    }
    async doAction({
        userId,
    }: PropInComeGetUserOnId): Promise<ReturnGetUserOnId> {
        return new Promise((resolve, reject) => {
            this.connect.query(
                `
                SELECT * FROM ${this.tableName}
                WHERE ${this.uid}=$1
            `,
                [userId],
                (err, res) => {
                    if (err) return reject(err);
                    if (res.rowCount === 0) return resolve(false);
                    resolve({
                        creator: {
                            nickname: res.rows[0].nickname,
                            uid: res.rows[0].uid,
                        },
                    });
                }
            );
        });
    }
}

export default GetUserOnId;
