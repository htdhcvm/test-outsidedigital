import Action from './Action';
import { Client } from 'pg';

import {
    InComeGetAllTegOnUser,
    ReturnDataGetAll,
} from '../../types/Models/Tag/GetAllInIdUser';

type Props = {
    tableName: string;
    creator: string;
    connect: Client;
};

class GetAllInIdUserAction implements Action {
    private tableName: string;
    private creator: string;
    private connect: Client;

    constructor({ tableName, connect, creator }: Props) {
        this.creator = creator;
        this.tableName = tableName;
        this.connect = connect;
    }
    async doAction({
        userId,
    }: InComeGetAllTegOnUser): Promise<ReturnDataGetAll> {
        return new Promise((resolve, reject) => {
            this.connect.query(
                `
                SELECT * FROM ${this.tableName}
                WHERE ${this.creator}=$1
            `,
                [userId],
                (err, res) => {
                    if (err) return reject(err);
                    resolve(res.rows);
                }
            );
        });
    }
}

export default GetAllInIdUserAction;
