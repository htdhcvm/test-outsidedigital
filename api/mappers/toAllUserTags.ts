import { ReturnDataGetAll } from '../types/Models/Tag/GetAllInIdUser';
import DTOServerGetAllTagsOnUser from '../DTO/server/GetAllTagsOnUser';

const toAllUserTags = (data: ReturnDataGetAll) => {
    const allTags: DTOServerGetAllTagsOnUser = {
        tags: [],
    };

    data.forEach((item) => {
        allTags.tags.push({
            id: item.id,
            name: item.name,
            sortOrder: item.sort_order.toString(),
        });
    });

    return allTags;
};

export default toAllUserTags;
