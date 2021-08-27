type Tag = {
    id: string;
    name: string;
    sortOrder: string;
};

type DTOGetUser = {
    email: string;
    nickname: string;
    tags: Tag[];
};

export default DTOGetUser;
