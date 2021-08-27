import Action from './Action';
import { Client } from 'pg';
import InComeDeleteOnId from '../../types/Models/Tag/DeleteOnId';

type Props = {
    connect: Client;
    tableNameUserTag: string;
    user_id: string;
    tag_id: string;
};

class DeleteTagInUserTag implements Action {
    private connect: Client;

    private tableNameUserTag: string;
    private user_id: string;
    private tag_id: string;

    constructor({ connect, tableNameUserTag, user_id, tag_id }: Props) {
        this.connect = connect;
        this.tableNameUserTag = tableNameUserTag;
        this.user_id = user_id;
        this.tag_id = tag_id;
    }
    async doAction({ id, userId }: InComeDeleteOnId): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connect.query(
                `
                DELETE FROM ${this.tableNameUserTag}
                WHERE ${this.user_id}=$1 AND ${this.tag_id}=$2
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

export default DeleteTagInUserTag;
