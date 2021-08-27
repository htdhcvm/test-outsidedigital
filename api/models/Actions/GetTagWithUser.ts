import Action from './Action';
import { Client } from 'pg';

import {
    PropsInComeGetTagWithUser,
    ReturnGetTagWithUser,
} from '../../types/Models/UserTagJoin/GetTagWithUser';

type Props = {
    connect: Client;
    creator: string;
    id: string;
    tableNameUser: string;
    tableNameTag: string;
    uid: string;
};

class GetTagWithUser implements Action {
    private connect: Client;
    private creator: string;
    private id: string;
    private tableNameUser: string;
    private tableNameTag: string;
    private uid: string;

    constructor({
        connect,
        creator,
        id,
        tableNameUser,
        tableNameTag,
        uid,
    }: Props) {
        this.connect = connect;
        this.creator = creator;
        this.id = id;
        this.tableNameUser = tableNameUser;
        this.tableNameTag = tableNameTag;
        this.uid = uid;
    }
    async doAction({
        id,
        userId,
    }: PropsInComeGetTagWithUser): Promise<ReturnGetTagWithUser> {
        return new Promise((resolve, reject) => {
            this.connect.query(
                `
                SELECT * FROM ${this.tableNameUser}
                JOIN ${this.tableNameTag}
                    ON ${this.tableNameUser}.${this.uid}=${this.tableNameTag}.${this.creator}
                WHERE ${this.creator}=$1 AND ${this.id}=$2
            `,
                [userId, id],
                (err, res) => {
                    if (err) return reject(err);
                    if (res.rowCount === 0) return resolve(false);
                    resolve({
                        creator: {
                            nickname: res.rows[0].nickname,
                            uid: res.rows[0].uid,
                        },
                        name: res.rows[0].name,
                        sortOrder: res.rows[0].sort_order,
                    });
                }
            );
        });
    }
}

export default GetTagWithUser;
