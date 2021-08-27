import TagRepository from '../repository/TagRepository';
import DTOClientTag from '../DTO/client/PostTag';
import { validOnActionAddNewTag } from '../validate/Validate';
import ReturnServiceNewTag from '../types/ReturnServiceNewTag';
import getFromAccessTokenUserId from '../Helpers/getFromAccessTokenUserId';
import DTOClientSortTagsAndGetOnLimit from '../DTO/client/SortTagsAndGetOnLimit';
import ParamsCheck from '../types/ParamsCheck';
import toSortTags from '../mappers/toSortTags';

class TagService {
    private tagRepository: TagRepository;

    constructor(tagRepository: TagRepository) {
        this.tagRepository = tagRepository;
    }

    async addNewTag({
        name,
        sortOrder,
        access_token,
    }: DTOClientTag & { access_token: string }): Promise<ReturnServiceNewTag> {
        const resultCheck = this.validateTagName({ name, sortOrder });

        const tagByName = await this.tagRepository.getTagByName(name);

        if (tagByName !== null)
            return {
                status: false,
                statusCode: 409,
                text: 'Tag with the same name already exists',
            };

        const userId = await getFromAccessTokenUserId(access_token);
        const newTag = await this.tagRepository.createNewTag({
            name,
            sortOrder,
            userId,
        });

        await this.tagRepository.createUserTag({ userId, tagId: newTag.id });

        return {
            status: true,
            statusCode: 200,
            newTag: {
                id: newTag.id,
                name: newTag.name,
                sortOrder: newTag.sortOrder,
            },
        };
    }

    validateTagName({ name, sortOrder }: DTOClientTag) {
        return validOnActionAddNewTag({ name, sortOrder });
    }

    async sortTagsGetOnLimit({
        sortByOrder,
        sortByName,
        offset,
        length,
    }: ParamsCheck) {
        const dataFromDb = await this.tagRepository.sortAndGetOnLimit({
            sortByOrder,
            sortByName,
            offset,
            length,
        });

        return toSortTags(dataFromDb, {
            offset,
            length,
        });
    }

    async updateTagData({
        access_token,
        id,
        name,
        sortOrder,
    }: {
        access_token: string;
        id: number;
        name: string;
        sortOrder: string;
    }) {
        const userId = await getFromAccessTokenUserId(access_token);
        const tagData = await this.tagRepository.updateTagData({
            userId,
            id,
            name,
            sortOrder,
        });

        const userData = await this.tagRepository.getUserOnId({ userId });

        if (tagData === false || userData === false) {
            return {
                status: false,
            };
        }
        return {
            userData,
            tagData,
        };
    }

    async deleteTagCascade({
        id,
        access_token,
    }: {
        id: number;
        access_token: string;
    }) {
        const userId = await getFromAccessTokenUserId(access_token);

        const resultDelete = await this.tagRepository.deleteFromUserTag({
            id,
            userId,
        });

        if (resultDelete === false)
            return {
                status: false,
                text: 'Not fount delete resources',
                statusCode: 404,
            };

        await this.tagRepository.deleteTag({ id, userId });
    }

    async getTagWithUser({
        id,
        access_token,
    }: {
        id: number;
        access_token: string;
    }) {
        const userId = await getFromAccessTokenUserId(access_token);

        return await this.tagRepository.getTagWithUser({ id, userId });
    }
}

export default TagService;
