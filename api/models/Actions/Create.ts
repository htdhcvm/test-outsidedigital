import Action from './Action';
import { Client } from 'pg';

import ParamsInComeCreate from '../../types/Models/Tag/Create';
import DTOServerTag from '../../DTO/server/PostTag';

type PropsFindByEmail = {
    tableName: string;
    name: string;
    connect: Client;
    creator: string;
    sortOrder: string;
    id: string;
};

class Create implements Action {
    private tableName: string;
    private connect: Client;

    private creator: string;
    private name: string;
    private sortOrder: string;
    private id: string;

    constructor({
        tableName,
        connect,
        creator,
        name,
        sortOrder,
        id,
    }: PropsFindByEmail) {
        this.tableName = tableName;
        this.connect = connect;
        this.name = name;
        this.creator = creator;
        this.sortOrder = sortOrder;
        this.id = id;
    }

    doAction({
        name,
        sortOrder,
        userId,
    }: ParamsInComeCreate): Promise<DTOServerTag> {
        return new Promise((resolve, reject) => {
            this.connect.query(
                `
                INSERT INTO ${this.tableName}(${this.id},${this.creator}, ${this.name}, ${this.sortOrder})
                VALUES((SELECT setval('tag_id_seq', max(id) + 1) FROM tag), $1, $2, $3)
                RETURNING ${this.id}, ${this.name}, ${this.sortOrder}
            `,
                [userId, name, sortOrder],
                (err, res) => {
                    if (err) return reject(err);

                    resolve({
                        id: res.rows[0].id,
                        name: res.rows[0].name,
                        sortOrder: res.rows[0].sort_order,
                    });
                }
            );
        });
    }
}

export default Create;
