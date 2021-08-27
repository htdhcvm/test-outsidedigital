import { ReturnGetTags } from '../types/Models/UserTagJoin/UserTagJoin';
import DTOGetUser from '../DTO/server/GetUser';

const toTagsUser = (data: ReturnGetTags) => {
    const tagsUser: DTOGetUser = {
        email: data[0].email,
        nickname: data[0].nickname,
        tags: [],
    };

    data.forEach((item) => {
        tagsUser.tags.push({
            id: item.id.toString(),
            name: item.name,
            sortOrder: item.sort_order.toString(),
        });
    });

    return tagsUser;
};

export default toTagsUser;
