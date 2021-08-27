type PropInComeGetUserOnId = {
    userId: string;
};

type ReturnGetUserOnId =
    | {
          creator: {
              nickname: string;
              uid: string;
          };
      }
    | boolean;

export { PropInComeGetUserOnId, ReturnGetUserOnId };
