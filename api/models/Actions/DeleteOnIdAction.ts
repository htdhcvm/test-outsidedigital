import Action from './Action';
import { Client } from 'pg';
import InComeDeleteOnId from '../../types/Models/Tag/DeleteOnId';

type Props = {
    tableName: string;
    creator: string;
    connect: Client;
    id: string;
};

class GetAllInIdUserAction implements Action {
    private tableName: string;
    private creator: string;
    private id: string;

    private connect: Client;

    constructor({ tableName, connect, creator, id }: Props) {
        this.tableName = tableName;
        this.id = id;
        this.creator = creator;
        this.connect = connect;
    }
    async doAction({ id, userId }: InComeDeleteOnId): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connect.query(
                `
                DELETE FROM ${this.tableName}
                WHERE ${this.creator}=$1 AND ${this.id}=$2
            `,
                [userId, id],
                (err, result) => {
                    if (err) return reject(err);
                    resolve();
                }
            );
        });
    }
}

export default GetAllInIdUserAction;
