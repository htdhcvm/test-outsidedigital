import ClientDTOSignIn from '../../DTO/client/SignIn';
import CheckUserParams from '../../types/CheckUserParams';
import CreateUserResponse from '../../types/CreateUserResponse';
import CreateNewRefresh from '../../types/CreateNewRefresh';
import AfterCreateRefresh from '../../types/AfterCreateRefresh';
import GetUserOnEmail from '../../types/GetUserOnEmail';
import FindByEmail from '../../types/FindByEmail';
import DeleteRefreshOnId from '../../types/DeleteRefreshOnId';
import ReturnGetBeRefreshToken from '../../types/ReturnGetBeRefreshToken';
import GetByRefreshToken from '../../types/GetByRefreshToken';
import DeleteByRefresh from '../../types/DeleteByRefresh';

interface Action {
    doAction({}:
        | ClientDTOSignIn
        | CheckUserParams
        | CreateNewRefresh
        | GetUserOnEmail
        | DeleteRefreshOnId
        | DeleteByRefresh
        | GetByRefreshToken):
        | Promise<CreateUserResponse>
        | Promise<void>
        | Promise<AfterCreateRefresh>
        | Promise<ReturnGetBeRefreshToken>
        | FindByEmail;
}

export default Action;
