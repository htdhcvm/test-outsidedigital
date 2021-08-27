type GetTagsUserInCome = {
    userId: string;
};

type ReturnGetTags = {
    uid: string;
    email: string;
    password: string;
    nickname: string;
    id: number;
    creator: string;
    name: string;
    sort_order: number;
}[];

export { GetTagsUserInCome, ReturnGetTags };
