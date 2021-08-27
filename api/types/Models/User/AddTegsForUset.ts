type PropsInCome = {
    userId: string;
    tags: number[];
};

type ReturnData =
    | {
          id: number;
          creator: string;
          name: string;
          sort_order: number;
      }[]
    | boolean;

export { PropsInCome, ReturnData };
