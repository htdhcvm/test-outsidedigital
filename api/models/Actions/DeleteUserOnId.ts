import Action from './Action';
import { Client } from 'pg';

import DeleteUser from '../../types/Models/User/DeleteUser';

type Props = {
    tableName: string;
    connect: Client;
};

class GetTagsUser implements Action {
    private tableName: string;
    private connect: Client;

    constructor({ tableName, connect }: Props) {
        this.tableName = tableName;
        this.connect = connect;
    }
    async doAction({ userId }: DeleteUser): Promise<void | boolean> {
        return new Promise((resolve, reject) => {
            this.connect.query(
                `
                DELETE FROM ${this.tableName} WHERE uid=$1
            `,
                [userId],
                (err, res) => {
                    console.log(res);
                    if (err) return reject(err);
                    if (res.rowCount === 0) return resolve(false);
                    resolve();
                }
            );
        });
    }
}

export default GetTagsUser;
