type Tag = {
    creator: {
        nickname: string;
        uid: string;
    };
    name: string;
    sortOrder: string;
};

type DTOServerGetTagSortBy = {
    data: Tag[];
    meta: {
        offset: number;
        length: number;
        quantity: number;
    };
};

export default DTOServerGetTagSortBy;
