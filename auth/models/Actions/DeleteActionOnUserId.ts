import Action from './Action';
import { Client } from 'pg';
import DeleteRefreshOnId from '../../types/DeleteRefreshOnId';

type PropsFindByEmail = {
    tableName: string;
    userId: string;
    connect: Client;
};

class DeleteActionOnUserId implements Action {
    private tableName: string;
    private userId: string;
    private connect: Client;

    constructor({ tableName, connect, userId }: PropsFindByEmail) {
        this.tableName = tableName;
        this.connect = connect;
        this.userId = userId;
    }

    doAction({ id }: DeleteRefreshOnId): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connect.query(
                `
                DELETE FROM ${this.tableName} WHERE ${this.userId}=$1
            `,
                [id],
                (err, res) => {
                    if (err) return reject(err);
                    resolve();
                }
            );
        });
    }
}

export default DeleteActionOnUserId;
