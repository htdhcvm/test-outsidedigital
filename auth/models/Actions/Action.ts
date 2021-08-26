import ClientDTOSignIn from '../../DTO/client/SignIn';
import CheckUserParams from '../../types/CheckUserParams';
import CreateUserResponse from '../../types/CreateUserResponse';
import CreateNewRefresh from '../../types/CreateNewRefresh';
import AfterCreateRefresh from '../../types/AfterCreateRefresh';

interface Action {
    doAction({}: ClientDTOSignIn | CheckUserParams | CreateNewRefresh):
        | Promise<CreateUserResponse>
        | Promise<void>
        | Promise<AfterCreateRefresh>;
}

export default Action;
