type PropsInComeUpdateUser = {
    userId: string;
    email: string;
    password: string;
    nickname: string;
};

type ReturnDataUpdateUser =
    | {
          email: string;
          nickname: string;
      }
    | boolean;

export { PropsInComeUpdateUser, ReturnDataUpdateUser };
