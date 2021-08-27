import Tag from '../models/Tag/Tag';
import UserTag from '../models/UserTag/UserTag';
import UserTagJoin from '../models/UserTagJoin/UserTagJoin';
import User from '../models/User/User';

import ParamsCheck from '../types/ParamsCheck';

class TagRepository {
    private tagModel: Tag;
    private userTag: UserTag;
    private userTagJoin: UserTagJoin;
    private user: User;

    constructor(
        tagModel: Tag,
        userTag: UserTag,
        userTagJoin: UserTagJoin,
        user: User
    ) {
        this.tagModel = tagModel;
        this.userTag = userTag;
        this.user = user;
        this.userTagJoin = userTagJoin;
    }

    async getTagByName(name: string) {
        return await this.tagModel.getByName({ name });
    }

    async createNewTag({
        name,
        sortOrder,
        userId,
    }: {
        name: string;
        sortOrder: number;
        userId: string;
    }) {
        return await this.tagModel.create({ name, sortOrder, userId });
    }

    async createUserTag({ userId, tagId }: { userId: string; tagId: number }) {
        await this.userTag.create({ userId, tagId });
    }

    async sortAndGetOnLimit({
        sortByOrder,
        sortByName,
        offset,
        length,
    }: ParamsCheck) {
        return await this.userTagJoin.sortAndGetOnLimit({
            sortByOrder,
            sortByName,
            offset,
            length,
        });
    }

    async updateTagData({
        userId,
        id,
        name,
        sortOrder,
    }: {
        userId: string;
        id: number;
        name: string;
        sortOrder: string;
    }) {
        return await this.tagModel.updateTagData({
            userId,
            id,
            name,
            sortOrder,
        });
    }

    async getUserOnId({ userId }: { userId: string }) {
        return await this.user.getUserOnId({ userId });
    }

    async deleteFromUserTag({ id, userId }: { id: number; userId: string }) {
        await this.userTagJoin.deleteTagInUserTag({ id, userId });
    }

    async deleteTag({ id, userId }: { id: number; userId: string }) {
        await this.tagModel.deleteOnId({ id, userId });
    }

    async getTagWithUser({ id, userId }: { id: number; userId: string }) {
        return await this.userTagJoin.getTagWithUser({ id, userId });
    }
}

export default TagRepository;
