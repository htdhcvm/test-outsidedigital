import { Router } from 'express';
import UserController from '../controller/UserController';
import UserService from '../service/UserService';
import UserRepository from '../repository/UserRepository';
import checkOnBearer from '../middleware/checkOnBearer';
import checkOnValidToken from '../middleware/checkOnValidToken';
import checkOnUpdateUserData from '../middleware/checkOnUpdateUserData';
import UserTagJoin from '../models/UserTagJoin/UserTagJoin';
import User from '../models/User/User';
import Tag from '../models/Tag/Tag';

const userRepository = new UserRepository(
    new UserTagJoin(),
    new User(),
    new Tag()
);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const router = Router();

router.get(
    '/user',
    checkOnBearer,
    checkOnValidToken,
    userController.getUserWithTags.bind(userController)
);
router.put(
    '/user',
    checkOnBearer,
    checkOnValidToken,
    checkOnUpdateUserData,
    userController.updateDataUser.bind(userController)
);
router.delete(
    '/user',
    checkOnBearer,
    checkOnValidToken,
    userController.deleteUser.bind(userController)
);
router.post(
    '/user/tag',
    checkOnBearer,
    checkOnValidToken,
    userController.addTagsForUser.bind(userController)
);
router.get(
    '/user/tag/my',
    checkOnBearer,
    checkOnValidToken,
    userController.getListTagsOnUser.bind(userController)
);

router.delete(
    '/user/tag/:id',
    checkOnBearer,
    checkOnValidToken,
    userController.deleteTagAngGetAll.bind(userController)
);

export default router;
