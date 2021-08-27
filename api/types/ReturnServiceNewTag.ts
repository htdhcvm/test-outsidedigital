import DTOServerTag from '../DTO/server/PostTag';

type ReturnServiceNewTag = {
    status: boolean;
    statusCode: number;
    text?: string;
    newTag?: DTOServerTag;
};
export default ReturnServiceNewTag;
