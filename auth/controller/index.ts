import { Request, Response } from 'express';
import ClientDTOSignIn from '../DTO/client/SignIn';
import ServerDTOSignIn from '../DTO/server/SignIn';
import AuthService from '../service';

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
            console.log(error);
            return res.send(500);
        }
        // console.log(resultSignIn);
    }
    async login(req: Request, res: Response) {}
    async logout(req: Request, res: Response) {}
    async refreshTokens(req: Request, res: Response) {}
}

export default AuthController;
