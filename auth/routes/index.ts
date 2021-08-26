import { Router } from 'express';
import AuthController from '../controller';
import AuthService from '../service';
import AuthRepository from '../repository';
import { User } from '../models/User/User';
import RefreshSessions from '../models/RefreshSessions/RefreshSessions';
import checkOnBearer from '../middleware/checkOnBearer';

const authRepository = new AuthRepository(new User(), new RefreshSessions());
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

const router = Router();

router.post('/signin', authController.signIn.bind(authController));
router.post('/login', authController.login.bind(authController));
router.post(
    '/logout',
    checkOnBearer,
    authController.logout.bind(authController)
);
router.delete(
    '/refresh-token',
    checkOnBearer,
    authController.refreshTokens.bind(authController)
);

export default router;
