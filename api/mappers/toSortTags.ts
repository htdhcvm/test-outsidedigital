import { ReturnDataSortFromDb } from '../types/Models/Tag/SortAndGetOnLimit';
import GetTagSortBy from '../DTO/server/GetTagSortBy';

const toSortTags = (
    dataFromDB: ReturnDataSortFromDb,
    { offset, length }: { offset: number; length: number }
) => {
    const validData: GetTagSortBy = {
        data: [],
        meta: {
            offset: offset,
            length: length,
            quantity: dataFromDB.length,
        },
    };

    dataFromDB.forEach((item) => {
        const creatorTmp: {
            nickname: string;
            uid: string;
        } = {
            nickname: '',
            uid: '',
        };

        if (item.creator !== null) {
            creatorTmp.nickname = item.nickname;
            creatorTmp.uid = item.uid;
        }

        validData.data.push({
            creator: {
                nickname: creatorTmp.nickname,
                uid: creatorTmp.uid,
            },
            name: item.name,
            sortOrder: item.sort_order.toString(),
        });
    });

    return validData;
};

export default toSortTags;
