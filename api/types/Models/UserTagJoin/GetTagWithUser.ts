type PropsInComeGetTagWithUser = {
    id: number;
    userId: string;
};

type ReturnGetTagWithUser = {
    creator: {
        nickname: string;
        uid: string;
    };
    name: string;
    sortOrder: number;
};

export { PropsInComeGetTagWithUser, ReturnGetTagWithUser };
