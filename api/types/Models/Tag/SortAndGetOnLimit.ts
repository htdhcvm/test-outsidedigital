import ParamsCheck from '../../ParamsCheck';

type PropsIncomeSort = {} & ParamsCheck;

type ReturnDataSort = {
    data: {
        creator: {
            nickname: string;
            uid: string;
        };
        name: string;
        sortOrder: string;
    }[];
    meta: {
        offset: number;
        length: number;
        quantity: number;
    };
};

type ReturnDataSortFromDb = {
    id: number;
    creator: string;
    name: string;
    sort_order: number;
    uid: string;
    email: string;
    password: string;
    nickname: string;
}[];

export { PropsIncomeSort, ReturnDataSort, ReturnDataSortFromDb };
