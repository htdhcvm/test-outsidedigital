import AuthRepository from '../repository';
import ClientDTOSignIn from '../DTO/client/SignIn';
import CheckUserParams from '../types/CheckUserParams';
import { isValidSignIn } from '../Validate/Validate';
import SignInReturn from '../types/SignInReturn';
import IssuePairTokenExpects from '../types/IssuePairTokenExpects';
import { v4 as uuidv4 } from 'uuid';
import getHash from '../Helpers/getHash';
import CreateNewRefresh from '../types/CreateNewRefresh';
import issueAccessToken from '../Helpers/issueAccessToken';

class AuthService {
    private authRepository: AuthRepository;

    constructor(authRepository: AuthRepository) {
        this.authRepository = authRepository;
    }

    checkValidUser({ email, password, nickname }: ClientDTOSignIn) {
        const resultCheck = isValidSignIn({ email, password, nickname });

        if (!resultCheck.status) return resultCheck;

        return {
            status: true,
        };
    }

    async createNewUser({ email, password, nickname }: ClientDTOSignIn) {
        return await this.authRepository.createNewUser({
            email,
            password,
            nickname,
        });
    }

    async checkUserOnExistDb({ email, nickname }: CheckUserParams) {
        const user = await this.authRepository.getUserOnEmailNickname({
            email,
            nickname,
        });

        return user;
    }

    async signIn({
        email,
        password,
        nickname,
    }: ClientDTOSignIn): Promise<SignInReturn> {
        const resultExist = await this.checkUserOnExistDb({
            email,
            nickname,
        });

        if (resultExist !== null)
            return {
                status: false,
                text: 'user already exists',
                statusCode: 409,
            };

        const user = await this.createNewUser({
            email,
            password: await getHash(password),
            nickname,
        });

        const pairToken = await this.issuePairToken({
            nickname,
            idUser: user.uid,
        });

        return {
            status: true,
            statusCode: 200,
            tokenData: {
                accessToken: pairToken.accessToken,
                refreshToken: pairToken.refreshToken,
                expiresIn: pairToken.expiresIn,
            },
        };
    }

    async issuePairToken({ nickname, idUser }: IssuePairTokenExpects) {
        const expireIn = new Date().getTime() + process.env.JWT_EXPIRE_SESSION;

        const refreshData = await this.createNewRefreshSession({
            expiresin: expireIn,
            userId: idUser,
            refreshToken: uuidv4(),
        });

        const accessToken = await issueAccessToken({
            id: idUser,
        });

        return {
            accessToken: accessToken,
            refreshToken: refreshData.refreshToken,
            expiresIn: +process.env.JWT_EXPIRE_ACCESS_TOKEN,
        };
    }

    async createNewRefreshSession({
        expiresin,
        userId,
        refreshToken,
    }: CreateNewRefresh) {
        return await this.authRepository.createNewRefreshToken({
            expiresin,
            userId,
            refreshToken,
        });
    }

    login() {}
    logout() {}
    refreshTokens() {}
}

export default AuthService;
