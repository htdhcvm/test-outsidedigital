import UserTagJoin from '../models/UserTagJoin/UserTagJoin';
import User from '../models/User/User';
import Tag from '../models/Tag/Tag';
import DTOClientAddTagsForUser from '../DTO/client/AddTagsForUser';

class UserRepository {
    private userTagJoin: UserTagJoin;
    private user: User;
    private tag: Tag;

    constructor(userTagJoin: UserTagJoin, user: User, tag: Tag) {
        this.userTagJoin = userTagJoin;
        this.user = user;
        this.tag = tag;
    }

    async getTagsUser({ userId }: { userId: string }) {
        return await this.userTagJoin.getTagsUser({ userId });
    }

    async deleteUser({ userId }: { userId: string }) {
        return await this.user.deleteUserOnId({ userId });
    }
    async addTagsForUser({
        userId,
        tags,
    }: { userId: string } & DTOClientAddTagsForUser) {
        return await this.userTagJoin.addTagsForUser({ userId, tags });
    }

    async checkOnEmailAndNickName({
        email,
        nickname,
    }: {
        email: string;
        nickname: string;
    }) {
        return await this.user.checkOnEmailAndNickName({
            email,
            nickname,
        });
    }

    async updateUserData({
        userId,
        email,
        password,
        nickname,
    }: {
        userId: string;
        email: string;
        password: string;
        nickname: string;
    }) {
        return await this.user.updateData({
            userId,
            email,
            password,
            nickname,
        });
    }

    async deleteTagOnId({ id, userId }: { id: number; userId: string }) {
        await this.tag.deleteOnId({ id, userId });
    }

    async getAllTagInIdUser({ userId }: { userId: string }) {
        return await this.tag.getAllInIdUser({ userId });
    }

    async deleteTagInUserTag({ id, userId }: { id: number; userId: string }) {
        await this.userTagJoin.deleteTagInUserTag({ id, userId });
    }
}

export default UserRepository;
