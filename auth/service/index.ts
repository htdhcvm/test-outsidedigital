import AuthRepository from '../repository';
import ClientDTOSignIn from '../DTO/client/SignIn';
import { isValidSignIn, isValidLogIn } from '../validate/Validate';
import IssuePairTokenExpects from '../types/IssuePairTokenExpects';
import { v4 as uuidv4 } from 'uuid';
import getHash from '../helpers/getHash';
import issueAccessToken from '../helpers/issueAccessToken';
import ClientDTOLogin from '../DTO/client/Login';
import CheckUserParams from '../types/CheckUserParams';
import CreateNewRefresh from '../types/CreateNewRefresh';
import comparePasswords from '../helpers/comparePasswords';
import LoginSignInReturn from '../types/LoginSignInReturn';
import Logout from '../types/Logout';
import getFromAccessTokenUserId from '../helpers/getFromAccessTokenUserId';
import PropRefreshToken from '../types/PropRefreshToken';
import checkAccessToken from '../helpers/checkAccessToken';
import verifyRefreshOnTime from '../helpers/verifyRefreshOnTime';
import getDataFromAccessToken from '../helpers/getDataFromAccessToken';

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

    checkValidLogIn({ email, password }: ClientDTOLogin) {
        const resultCheck = isValidLogIn({ email, password });
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
    }: ClientDTOSignIn): Promise<LoginSignInReturn> {
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
            nickname,
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

    async login({
        email,
        password,
    }: ClientDTOLogin): Promise<LoginSignInReturn> {
        const existUser = await this.checkUserOnExist({ email });

        if (!existUser)
            return {
                status: false,
                statusCode: 404,
                text: "User don't exist",
            };

        const resultCompare = await comparePasswords(
            password,
            existUser.password
        );

        if (!resultCompare)
            return {
                status: false,
                statusCode: 401,
                text: 'Password is not valid',
            };

        const pairToken = await this.issuePairToken({
            nickname: existUser.nickname,
            idUser: existUser.uid,
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

    async checkUserOnExist({ email }: { email: string }) {
        const user = await this.authRepository.getUserOnEmail({ email });
        if (user === null) return false;
        return user;
    }

    async logout({ access_token }: Logout) {
        const userId = await getFromAccessTokenUserId(access_token);
        await this.authRepository.deleteRefreshSessionOnUserId({ id: userId });
    }

    async refreshTokens({
        access_token,
        refreshToken,
    }: PropRefreshToken): Promise<LoginSignInReturn> {
        const resultCheck = await checkAccessToken(access_token);

        if (!resultCheck)
            return {
                status: false,
                statusCode: 401,
                text: 'token is not valid',
            };

        const oldRefresh = await this.authRepository.getByRefreshToken({
            refreshToken,
        });

        if (oldRefresh === null)
            return {
                status: false,
                statusCode: 404,
                text: 'Session refresh only once',
            };

        const relVerify = verifyRefreshOnTime(oldRefresh);

        if (!relVerify)
            return {
                status: false,
                statusCode: 401,
                text: 'Refresh session expired',
            };

        await this.authRepository.deleteByRefresh({
            refreshToken,
        });

        const dataUser = await getDataFromAccessToken(access_token);

        const accessToken = await issueAccessToken({
            id: dataUser.id,
            nickname: dataUser.nickname,
        });

        return {
            status: true,
            statusCode: 200,
            tokenData: {
                accessToken: accessToken,
                expiresIn: +process.env.JWT_EXPIRE_ACCESS_TOKEN,
            },
        };
    }
}

export default AuthService;
