type PropInComeUpdateTagData = {
    userId: string;
    id: number;
    name: string;
    sortOrder: string;
};

type ReturnUpdateTagData =
    | {
          name: string;
          sortOrder: string;
      }
    | boolean;

export { PropInComeUpdateTagData, ReturnUpdateTagData };
