import Action from './Action';
import { Client } from 'pg';
import {
    PropsInCome,
    ReturnData,
} from '../../types/Models/User/AddTegsForUset';

type PropAddTagsForUser = {
    connect: Client;
    tableNameTag: string;
    creator: string;
    id: string;
    tableNameUserTag: string;
    user_id: string;
    tag_id: string;
};

class AddTagsForUser implements Action {
    private connect: Client;
    private tableNameTag: string;
    private tableNameUserTag: string;
    private creator: string;
    private id: string;
    private user_id: string;
    private tag_id: string;
    constructor({
        connect,
        tableNameTag,
        tableNameUserTag,
        creator,
        id,
        user_id,
        tag_id,
    }: PropAddTagsForUser) {
        this.connect = connect;
        this.tableNameTag = tableNameTag;
        this.tableNameUserTag = tableNameUserTag;
        this.creator = creator;
        this.id = id;
        this.user_id = user_id;
        this.tag_id = tag_id;
    }

    doAction({ userId, tags }: PropsInCome): Promise<ReturnData> {
        return new Promise(async (resolve, reject) => {
            try {
                let markTransaction = false;
                await this.connect.query('BEGIN');
                for (let i = 0; i < tags.length; i++) {
                    const tag = await this.connect.query(
                        `
                        SELECT COUNT(*) FROM ${this.tableNameTag} WHERE ${this.id}=$1
                    `,
                        [tags[i]]
                    );

                    if (+tag.rows[0].count === 0) {
                        await this.connect.query('ROLLBACK');
                        markTransaction = true;
                        break;
                    }

                    await this.connect.query(
                        `
                        UPDATE ${this.tableNameTag}
                        SET ${this.creator}=$1
                        WHERE ${this.id}=$2
                    `,
                        [userId, tags[i]]
                    );

                    await this.connect.query(
                        `
                            INSERT INTO ${this.tableNameUserTag}(${this.user_id}, ${this.tag_id})
                            VALUES($1, $2)
                        `,
                        [userId, tags[i]]
                    );
                }
                await this.connect.query('COMMIT');

                let listTagsUser;
                if (!markTransaction) {
                    listTagsUser = await this.connect.query(
                        `
                        SELECT * FROM ${this.tableNameTag}
                        WHERE ${this.creator}=$1
                    `,
                        [userId]
                    );
                    return resolve(listTagsUser.rows);
                }

                resolve(false);
            } catch (error) {
                await this.connect.query('ROLLBACK');
                reject(error);
            }
        });
    }
}

export default AddTagsForUser;
