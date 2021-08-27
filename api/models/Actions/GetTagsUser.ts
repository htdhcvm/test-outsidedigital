import Action from './Action';
import {
    GetTagsUserInCome,
    ReturnGetTags,
} from '../../types/Models/UserTagJoin/UserTagJoin';
import { Client } from 'pg';

type Props = {
    tableNameUser: string;
    tableNameTag: string;
    connect: Client;
};

class GetTagsUser implements Action {
    private tableNameUser: string;
    private tableNameTag: string;
    private connect: Client;

    constructor({ tableNameUser, tableNameTag, connect }: Props) {
        this.tableNameUser = tableNameUser;
        this.tableNameTag = tableNameTag;
        this.connect = connect;
    }
    async doAction({ userId }: GetTagsUserInCome): Promise<ReturnGetTags> {
        return new Promise((resolve, reject) => {
            this.connect.query(
                `
                    select * from user_outside join tag on user_outside.uid = tag.creator where user_outside.uid=$1;
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

export default GetTagsUser;
