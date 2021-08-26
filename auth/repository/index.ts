import ClientDTOSignIn from '../DTO/client/SignIn';
import CheckUserParams from '../types/CheckUserParams';
import { User } from '../models/User/User';
import RefreshSessions from '../models/RefreshSessions/RefreshSessions';
import CreateNewRefresh from '../types/CreateNewRefresh';

class AuthRepository {
    private userModel: User;
    private refreshModel: RefreshSessions;

    constructor(userModel: User, refreshModel: RefreshSessions) {
        this.userModel = userModel;
        this.refreshModel = refreshModel;
    }

    async createNewUser({ email, password, nickname }: ClientDTOSignIn) {
        return await this.userModel.create({ email, password, nickname });
    }

    async getUserOnEmailNickname({ email, nickname }: CheckUserParams) {
        const user = await this.userModel.findByEmailNickname({
            email,
            nickname,
        });

        return user;
    }

    async createNewRefreshToken({
        expiresin,
        userId,
        refreshToken,
    }: CreateNewRefresh) {
        return await this.refreshModel.create({
            expiresin,
            userId,
            refreshToken,
        });
    }
}

export default AuthRepository;
