import { Client } from 'pg';
import DbConnection from '../DbWorker';
import Action from '../Actions/Action';
import {
    GetTagsUserInCome,
    ReturnGetTags,
} from '../../types/Models/UserTagJoin/UserTagJoin';
import GetTagsUser from '../Actions/GetTagsUser';
import {
    PropsInCome,
    ReturnData,
} from '../../types/Models/User/AddTegsForUset';
import AddTagsForUser from '../Actions/AddTagsForUser';
import {
    PropsIncomeSort,
    ReturnDataSortFromDb,
} from '../../types/Models/Tag/SortAndGetOnLimit';
import SortAndGetOnLimit from '../Actions/SortAndGetOnLimit';
import InComeDeleteOnId from '../../types/Models/Tag/DeleteOnId';
import DeleteTagInUserTag from '../Actions/DeleteTagInUserTag';
import {
    PropsInComeGetTagWithUser,
    ReturnGetTagWithUser,
} from '../../types/Models/UserTagJoin/GetTagWithUser';
import GetTagWithUser from '../Actions/GetTagWithUser';
import { PropInComeDeleteTagOnUserId } from '../../types/Models/UserTagJoin/DeleteTagOnUserId';
import DeleteTagInUserTagByUserId from '../Actions/DeleteTagInUserTagByUserId';

class UserTagJoin {
    private connect: Client;
    private tableNameUser: string = 'user_outside';
    private tableNameTag: string = 'tag';
    private tableNameUserTag: string = 'user_tag';

    private uid: string = 'uid';
    private email: string = 'email';
    private password: string = 'password';
    private nickname: string = 'nickname';

    private id: string = 'id';
    private creator: string = 'creator';
    private name: string = 'name';
    private sort_order: string = 'sort_order';

    private user_id: string = 'user_id';
    private tag_id: string = 'tag_id';

    private getTagsUserAction: Action;
    private addTagsForUserAction: Action;
    private sortAndGetOnLimitAction: Action;
    private deleteTagInUserTagAction: Action;
    private getTagWithUserAction: Action;
    private deleteTagInUserTagByUserIdAction: Action;

    constructor() {
        this.connect = DbConnection.connect();
        this.getTagsUserAction = new GetTagsUser({
            tableNameUser: this.tableNameUser,
            tableNameTag: this.tableNameTag,
            connect: this.connect,
        });

        this.addTagsForUserAction = new AddTagsForUser({
            tableNameTag: this.tableNameTag,
            tableNameUserTag: this.tableNameUserTag,
            connect: this.connect,
            creator: this.creator,
            id: this.id,
            user_id: this.user_id,
            tag_id: this.tag_id,
        });

        this.sortAndGetOnLimitAction = new SortAndGetOnLimit({
            connect: this.connect,
            tableName: this.tableNameTag,
            name: this.name,
            sortOrder: this.sort_order,
            tableNameUser: this.tableNameUser,
            uid: this.uid,
        });

        this.deleteTagInUserTagAction = new DeleteTagInUserTag({
            connect: this.connect,
            tableNameUserTag: this.tableNameUserTag,
            user_id: this.user_id,
            tag_id: this.tag_id,
        });

        this.getTagWithUserAction = new GetTagWithUser({
            connect: this.connect,
            creator: this.creator,
            id: this.id,
            tableNameUser: this.tableNameUser,
            tableNameTag: this.tableNameTag,
            uid: this.uid,
        });

        this.deleteTagInUserTagByUserIdAction = new DeleteTagInUserTagByUserId({
            connect: this.connect,
            tableNameUserTag: this.tableNameUserTag,
            user_id: this.user_id,
        });
    }

    async getTagsUser({ userId }: GetTagsUserInCome): Promise<ReturnGetTags> {
        return (await this.getTagsUserAction.doAction({
            userId,
        })) as ReturnGetTags;
    }

    async addTagsForUser({ userId, tags }: PropsInCome): Promise<ReturnData> {
        return (await this.addTagsForUserAction.doAction({
            userId,
            tags,
        })) as ReturnData;
    }

    async sortAndGetOnLimit({
        sortByOrder,
        sortByName,
        offset,
        length,
    }: PropsIncomeSort): Promise<ReturnDataSortFromDb> {
        return (await this.sortAndGetOnLimitAction.doAction({
            sortByOrder,
            sortByName,
            offset,
            length,
        })) as ReturnDataSortFromDb;
    }

    async deleteTagInUserTag({ id, userId }: InComeDeleteOnId) {
        return (await this.deleteTagInUserTagAction.doAction({
            id,
            userId,
        })) as Boolean;
    }

    async getTagWithUser({
        id,
        userId,
    }: PropsInComeGetTagWithUser): Promise<ReturnGetTagWithUser> {
        return (await this.getTagWithUserAction.doAction({
            id,
            userId,
        })) as ReturnGetTagWithUser;
    }

    async deleteTagInUserTagByUserId({ userId }: PropInComeDeleteTagOnUserId) {
        await this.deleteTagInUserTagByUserIdAction.doAction({ userId });
    }
}

export default UserTagJoin;
