import { Request, Response } from 'express';
import ClientDTOSignIn from '../DTO/client/SignIn';
import ServerDTOSignIn from '../DTO/server/SignIn';
import ServerDTOLogin from '../DTO/server/Login';
import AuthService from '../service';
import ClientDTOLogin from '../DTO/client/Login';
import ServerDTORefreshToken from '../DTO/server/RefreshToken';

class AuthController {
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }
    async signIn(req: Request, res: Response) {
        const { email, password, nickname } = req.body;
        const signIn: ClientDTOSignIn = {
            email,
            password,
            nickname,
        };

        try {
            const resultCheckValid = this.authService.checkValidUser({
                email: signIn.email,
                password: signIn.password,
                nickname: signIn.nickname,
            });

            if (!resultCheckValid.status)
                return res.status(400).send(resultCheckValid.text);

            const resultSignIn = await this.authService.signIn({
                email: signIn.email,
                password: signIn.password,
                nickname: signIn.nickname,
            });

            if (!resultSignIn.status)
                return res
                    .status(resultSignIn.statusCode)
                    .send(resultSignIn.text);

            const DTOSignIn: ServerDTOSignIn = {
                token: resultSignIn.tokenData.accessToken,
                expire: resultSignIn.tokenData.expiresIn.toString(),
            };

            return res
                .status(200)
                .cookie('refreshToken', resultSignIn.tokenData.refreshToken, {
                    maxAge: +process.env.JWT_EXPIRE_SESSION,
                    httpOnly: true,
                })
                .send(DTOSignIn);
        } catch (error) {
            return res.send(500);
        }
    }
    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        const logIn: ClientDTOLogin = {
            email,
            password,
        };

        try {
            const resultCheckValid = this.authService.checkValidLogIn({
                email: logIn.email,
                password: logIn.password,
            });

            if (!resultCheckValid.status)
                return res.status(400).send(resultCheckValid.text);

            const resultLogin = await this.authService.login({
                email: logIn.email,
                password: logIn.password,
            });

            if (!resultLogin.status)
                return res
                    .status(resultLogin.statusCode)
                    .send(resultLogin.text);

            const DTOLogin: ServerDTOLogin = {
                token: resultLogin.tokenData.accessToken,
                expire: resultLogin.tokenData.expiresIn.toString(),
            };

            return res
                .status(200)
                .cookie('refreshToken', resultLogin.tokenData.refreshToken, {
                    maxAge: +process.env.JWT_EXPIRE_SESSION,
                    httpOnly: true,
                })
                .send(DTOLogin);
        } catch (error) {
            return res.send(500);
        }
    }

    async logout(req: Request, res: Response) {
        const access_token = req.header('authorization').split(' ')[1];

        try {
            await this.authService.logout({
                access_token,
            });

            res.send(200);
        } catch (error) {
            return res.send(500);
        }
    }
    async refreshTokens(req: Request, res: Response) {
        const access_token = req.header('authorization').split(' ')[1];
        const { refreshToken } = req.cookies;

        try {
            const resultRefresh = await this.authService.refreshTokens({
                access_token,
                refreshToken,
            });

            if (!resultRefresh.status)
                return res
                    .status(resultRefresh.statusCode)
                    .send(resultRefresh.text);

            const DTORefresh: ServerDTORefreshToken = {
                token: resultRefresh.tokenData.accessToken,
                expire: resultRefresh.tokenData.expiresIn.toString(),
            };

            return res.status(200).clearCookie('refreshToken').send(DTORefresh);
        } catch (error) {
            return res.send(500);
        }
        // const { refreshToken } = req.cookies;
    }
}

export default AuthController;
