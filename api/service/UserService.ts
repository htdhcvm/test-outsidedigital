import UserRepository from '../repository/UserRepository';
import getFromAccessTokenUserId from '../helpers/getFromAccessTokenUserId';
import toTagsUser from '../mappers/toTagsUser';
import logoutRequest from '../helpers/logoutRequest';
import DTOClientAddTagsForUser from '../DTO/client/AddTagsForUser';
import toAddTagsForUser from '../mappers/toAddTagsForUser';
import CompareValidateUpdateUser from '../types/CompareValidateUpdateUser';
import isValidData from '../validate/ValidateUserData';
import getHash from '../helpers/getHash';
import toAllUserTags from '../mappers/toAllUserTags';
import toGetListTagsUser from '../mappers/toGetListTagsUser';

class UserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async getUserWithTags({ access_token }: { access_token: string }) {
        const userId = await getFromAccessTokenUserId(access_token);
        const resultTagsUser = await this.userRepository.getTagsUser({
            userId,
        });

        if (resultTagsUser.length === 0)
            return {
                status: false,
                statusCode: 400,
                text: 'Not found tags user',
            };

        return {
            status: true,
            statusCode: 200,
            data: toTagsUser(resultTagsUser),
        };
    }

    async deleteUserAndLogout({ access_token }: { access_token: string }) {
        const resLogout = await logoutRequest(access_token);

        if (!resLogout)
            return {
                status: false,
                statusCode: 401,
            };
        const userId = await getFromAccessTokenUserId(access_token);

        await this.userRepository.deleteTagInUserTagByUserId({ userId });
        const resultDelete = await this.userRepository.deleteUser({ userId });

        if (resultDelete === false) {
            return {
                status: false,
                statusCode: 404,
            };
        }
        return {
            status: true,
            statusCode: 200,
        };
    }

    async addTagsForUser({
        access_token,
        tags,
    }: { access_token: string } & DTOClientAddTagsForUser) {
        const userId = await getFromAccessTokenUserId(access_token);

        const resultAddTagsForUser = await this.userRepository.addTagsForUser({
            userId,
            tags,
        });

        if (resultAddTagsForUser === false) return resultAddTagsForUser;
        return toAddTagsForUser(resultAddTagsForUser);
    }

    async updateDataUser(
        forValidData: CompareValidateUpdateUser,
        access_token: string
    ) {
        const resultCheck = isValidData(forValidData);
        const userId = await getFromAccessTokenUserId(access_token);

        if (!resultCheck.status)
            return {
                status: false,
                text: resultCheck.text,
            };

        const data = {
            email: forValidData.email.check ? forValidData.email.value : '',
            password: forValidData.password.check
                ? forValidData.password.value
                : '',
            nickname: forValidData.nickname.check
                ? forValidData.nickname.value
                : '',
        };

        if (data.email.length > 0 || data.nickname.length > 0) {
            const resCheckOnEmailNickname =
                await this.userRepository.checkOnEmailAndNickName({
                    email: data.email,
                    nickname: data.nickname,
                });

            if (!resCheckOnEmailNickname.check)
                return {
                    status: false,
                    text: 'User with email or nickname already exist',
                };
        }

        const resultUpdate = await this.userRepository.updateUserData({
            userId,
            email: data.email,
            password: await getHash(data.password),
            nickname: data.nickname,
        });

        if (resultUpdate === false) {
            return {
                status: false,
                text: 'Not found user',
            };
        }

        return {
            status: true,
            data: resultUpdate,
        };
    }

    async deleteTagGetAll({
        id,
        access_token,
    }: {
        id: number;
        access_token: string;
    }) {
        const userId = await getFromAccessTokenUserId(access_token);
        await this.userRepository.deleteTagInUserTag({ id, userId });
        await this.userRepository.deleteTagOnId({ id, userId });
        const allTagUser = await this.userRepository.getAllTagInIdUser({
            userId,
        });

        return toAllUserTags(allTagUser);
    }

    async getListTagsOnUser({ access_token }: { access_token: string }) {
        const userId = await getFromAccessTokenUserId(access_token);

        const listTagsFromDb = await this.userRepository.getTagsUser({
            userId,
        });

        return toGetListTagsUser(listTagsFromDb);
    }
}
export default UserService;
