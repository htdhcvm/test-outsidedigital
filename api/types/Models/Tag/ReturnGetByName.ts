type ReturnGetByName = {
    id: number;
    creator: string;
    name: string;
    sortOrder: number;
} | null;

type ParamsInCome = {
    name: string;
};

export { ReturnGetByName, ParamsInCome };
