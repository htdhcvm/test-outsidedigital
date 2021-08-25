import { Router } from 'express';
import AuthController from '../controller';

const authController = new AuthController();

const router = Router();

router.post('/signin', authController.signIn.bind(authController));
router.post('/login', authController.login.bind(authController));
router.post('/logout', authController.logout.bind(authController));
router.post(
    '/refresh-tokens',
    authController.refreshTokens.bind(authController)
);

export default router;
