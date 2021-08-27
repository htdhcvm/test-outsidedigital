import Action from './Action';
import { Client } from 'pg';
import { PropInComeDeleteTagOnUserId } from '../../types/Models/UserTagJoin/DeleteTagOnUserId';

type Props = {
    connect: Client;
    tableNameUserTag: string;
    user_id: string;
};

class DeleteTagInUserTagByUserId implements Action {
    private connect: Client;
    private tableNameUserTag: string;
    private user_id: string;

    constructor({ connect, tableNameUserTag, user_id }: Props) {
        this.connect = connect;
        this.tableNameUserTag = tableNameUserTag;
        this.user_id = user_id;
    }
    async doAction({ userId }: PropInComeDeleteTagOnUserId): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connect.query(
                `
                DELETE FROM ${this.tableNameUserTag}
                WHERE ${this.user_id}=$1
            `,
                [userId],
                (err, result) => {
                    if (err) return reject(err);
                    resolve();
                }
            );
        });
    }
}

export default DeleteTagInUserTagByUserId;
