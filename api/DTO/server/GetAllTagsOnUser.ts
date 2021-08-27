type DTOServerGetAllTagsOnUser = {
    tags: Array<{
        id: number;
        name: string;
        sortOrder: string;
    }>;
};

export default DTOServerGetAllTagsOnUser;
