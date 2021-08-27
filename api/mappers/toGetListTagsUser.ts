import DTOServerGetAllTagsOnUser from '../DTO/server/GetAllTagsOnUser';
import { ReturnGetTags } from '../types/Models//UserTagJoin/UserTagJoin';

const toGetListTagsUser = (data: ReturnGetTags): DTOServerGetAllTagsOnUser => {
    const litsTags: DTOServerGetAllTagsOnUser = {
        tags: [],
    };

    data.forEach((item) => {
        litsTags.tags.push({
            id: item.id,
            name: item.name,
            sortOrder: item.sort_order.toString(),
        });
    });

    return litsTags;
};

export default toGetListTagsUser;
