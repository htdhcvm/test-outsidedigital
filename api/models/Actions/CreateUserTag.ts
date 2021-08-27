import Action from './Action';
import { Client } from 'pg';

import CreateUserTagInCome from '../../types/Models/UserTag/CreateUserTag';

type PropCreateUserTag = {
    connect: Client;
    tableName: string;
    user_id: string;
    tag_id: string;
};

class CreateUserTag implements Action {
    private tableName: string;
    private connect: Client;

    private user_id: string;
    private tag_id: string;

    constructor({ connect, tableName, user_id, tag_id }: PropCreateUserTag) {
        this.connect = connect;
        this.tableName = tableName;
        this.user_id = user_id;
        this.tag_id = tag_id;
    }

    doAction({ userId, tagId }: CreateUserTagInCome): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connect.query(
                `
                INSERT INTO ${this.tableName}(${this.user_id}, ${this.tag_id})
                VALUES($1, $2)
            `,
                [userId, tagId],
                (err, res) => {
                    if (err) return reject(err);
                    resolve();
                }
            );
        });
    }
}

export default CreateUserTag;
