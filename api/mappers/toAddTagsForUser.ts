import { ReturnData } from '../types/Models/User/AddTegsForUset';
import DTOServerAddTagsForUser from '../DTO/server/AddTagsForUser';

const toAddTagsForUser = (tagsUser: ReturnData): DTOServerAddTagsForUser => {
    if (tagsUser !== true && tagsUser !== false) {
        const tagsForUser: DTOServerAddTagsForUser = {
            tags: [],
        };

        tagsUser.forEach((item) => {
            tagsForUser.tags.push({
                id: item.id,
                name: item.name,
                sortOrder: item.sort_order.toString(),
            });
        });

        return tagsForUser;
    }
};

export default toAddTagsForUser;
