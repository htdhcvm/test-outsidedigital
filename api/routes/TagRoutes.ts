import { Router } from 'express';
import TagController from '../controller/TagController';
import TagService from '../service/TagService';
import TagRepository from '../repository/TagRepository';
import checkOnBearer from '../middleware/checkOnBearer';
import checkOnValidToken from '../middleware/checkOnValidToken';
import checkParamsSortTeg from '../middleware/checkParamsSortTeg';
import Tag from '../models/Tag/Tag';
import UserTag from '../models/UserTag/UserTag';
import UserTagJoin from '../models/UserTagJoin/UserTagJoin';
import User from '../models/User/User';

const tagRepository = new TagRepository(
    new Tag(),
    new UserTag(),
    new UserTagJoin(),
    new User()
);
const tagService = new TagService(tagRepository);
const tagController = new TagController(tagService);

const router = Router();

router.post(
    '/tag',
    checkOnBearer,
    checkOnValidToken,
    tagController.addNewTag.bind(tagController)
);
router.get(
    '/tag/:id',
    checkOnBearer,
    checkOnValidToken,
    tagController.getTagWithUser.bind(tagController)
);
router.get(
    '/tag',
    checkOnBearer,
    checkOnValidToken,
    checkParamsSortTeg,
    tagController.sortTagsAndGetOnLimit.bind(tagController)
);
router.put(
    '/tag/:id',
    checkOnBearer,
    checkOnValidToken,
    tagController.updateTagData.bind(tagController)
);
router.delete(
    '/tag/:id',
    checkOnBearer,
    checkOnValidToken,
    tagController.deleteTagCascade.bind(tagController)
);

export default router;
