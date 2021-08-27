import {
    ReturnGetByName,
    ParamsInCome,
} from '../../types/Models/Tag/ReturnGetByName';
import ParamsInComeCreate from '../../types/Models/Tag/Create';
import DTOServerTag from '../../DTO/server/PostTag';
import CreateUserTag from '../../types/Models/UserTag/CreateUserTag';
import {
    GetTagsUserInCome,
    ReturnGetTags,
} from '../../types/Models/UserTagJoin/UserTagJoin';

import {
    PropsInCome,
    ReturnData,
} from '../../types/Models/User/AddTegsForUset';

import {
    PropsIncomeSort,
    ReturnDataSortFromDb,
} from '../../types/Models/Tag/SortAndGetOnLimit';

import {
    PropsCheckEmailNickname,
    ReturnCheckEmailNickname,
} from '../../types/Models/User/CheckOnEmailAndNickName';
import {
    PropsInComeUpdateUser,
    ReturnDataUpdateUser,
} from '../../types/Models/User/UpdateData';

import {
    InComeGetAllTegOnUser,
    ReturnDataGetAll,
} from '../../types/Models/Tag/GetAllInIdUser';
import InComeDeleteOnId from '../../types/Models/Tag/DeleteOnId';

import {
    PropInComeUpdateTagData,
    ReturnUpdateTagData,
} from '../../types/Models/Tag/UpdateTagData';

import {
    PropInComeGetUserOnId,
    ReturnGetUserOnId,
} from '../../types/Models/User/GetUserOnId';

import {
    PropsInComeGetTagWithUser,
    ReturnGetTagWithUser,
} from '../../types/Models/UserTagJoin/GetTagWithUser';

interface Action {
    doAction({}:
        | ParamsInCome
        | ParamsInComeCreate
        | CreateUserTag
        | GetTagsUserInCome
        | PropsIncomeSort
        | PropsCheckEmailNickname
        | PropsInComeUpdateUser
        | InComeGetAllTegOnUser
        | InComeDeleteOnId
        | PropInComeUpdateTagData
        | PropInComeGetUserOnId
        | PropsInComeGetTagWithUser
        | PropsInCome):
        | Promise<void>
        | Promise<void | boolean>
        | Promise<ReturnGetByName>
        | Promise<ReturnGetUserOnId>
        | Promise<DTOServerTag>
        | Promise<ReturnData>
        | Promise<ReturnGetTagWithUser>
        | Promise<ReturnDataGetAll>
        | Promise<ReturnCheckEmailNickname>
        | Promise<ReturnDataSortFromDb>
        | Promise<ReturnUpdateTagData>
        | Promise<ReturnDataUpdateUser>
        | Promise<ReturnGetTags>;
}

export default Action;
