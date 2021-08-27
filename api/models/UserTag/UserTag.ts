import { Client } from 'pg';
import DbConnection from '../DbWorker';
import Action from '../Actions/Action';
import CreateUserTagInCome from '../../types/Models/UserTag/CreateUserTag';
import CreateUserTag from '../Actions/CreateUserTag';

class UserTag {
    private connect: Client;
    private tableName: string = 'user_tag';

    private id: string = 'id';
    private user_id: string = 'user_id';
    private tag_id: string = 'tag_id';

    private createUserTagAction: Action;

    constructor() {
        this.connect = DbConnection.connect();
        this.createUserTagAction = new CreateUserTag({
            connect: this.connect,
            tableName: this.tableName,
            user_id: this.user_id,
            tag_id: this.tag_id,
        });
    }

    async create({ userId, tagId }: CreateUserTagInCome) {
        await this.createUserTagAction.doAction({ userId, tagId });
    }
}

export default UserTag;
