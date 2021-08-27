import Action from './Action';
import { Client } from 'pg';

import {
    ReturnGetByName,
    ParamsInCome,
} from '../../types/Models/Tag/ReturnGetByName';

type PropsFindByEmail = {
    tableName: string;
    name: string;
    connect: Client;
};

class GetByNameAction implements Action {
    private tableName: string;
    private name: string;
    private connect: Client;

    constructor({ tableName, connect, name }: PropsFindByEmail) {
        this.tableName = tableName;
        this.connect = connect;
        this.name = name;
    }

    doAction({ name }: ParamsInCome): Promise<ReturnGetByName> {
        return new Promise((resolve, reject) => {
            this.connect.query(
                `
                SELECT * FROM ${this.tableName} WHERE ${this.name}=$1
            `,
                [name],
                (err, res) => {
                    if (err) return reject(err);
                    if (res.rowCount === 0) return resolve(null);
                    resolve({
                        id: res.rows[0].id,
                        creator: res.rows[0].creator,
                        name: res.rows[0].name,
                        sortOrder: res.rows[0].sortOrder,
                    });
                }
            );
        });
    }
}

export default GetByNameAction;
