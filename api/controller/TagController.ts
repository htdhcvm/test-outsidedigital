import { Request, Response } from 'express';
import TagService from '../service/TagService';
import DTOClientTag from '../DTO/client/PostTag';
import ParamsCheck from '../types/ParamsCheck';

class TagController {
    private tagService: TagService;

    constructor(tagService: TagService) {
        this.tagService = tagService;
    }

    async addNewTag(req: Request, res: Response) {
        const { name, sortOrder } = req.body;
        const access_token = req.header('authorization').split(' ')[1];

        const tag: DTOClientTag = {
            name,
            sortOrder: sortOrder === undefined ? 0 : +sortOrder,
        };

        try {
            const resultAdd = await this.tagService.addNewTag({
                name: tag.name,
                sortOrder: tag.sortOrder,
                access_token,
            });

            if (!resultAdd.status)
                return res.status(resultAdd.statusCode).send(resultAdd.text);

            return res.status(200).send(resultAdd.newTag);
        } catch (error) {
            res.send(500);
        }
    }

    async sortTagsAndGetOnLimit(
        req: Request & { check: ParamsCheck },
        res: Response
    ) {
        const { length, offset, sortByName, sortByOrder } = req.check;

        try {
            const tags = await this.tagService.sortTagsGetOnLimit({
                sortByOrder,
                sortByName,
                offset,
                length,
            });

            res.send(tags);
        } catch (error) {
            res.send(500);
        }
    }

    async updateTagData(req: Request, res: Response) {
        const { id } = req.params;
        const { name, sortOrder } = req.body;
        const access_token = req.header('authorization').split(' ')[1];

        try {
            const result = await this.tagService.updateTagData({
                access_token,
                id: +id,
                name,
                sortOrder,
            });
            if (result.status == false)
                return res.status(404).send('Not found records');

            res.send(result);
        } catch (error) {
            res.send(500);
        }
    }
    async deleteTagCascade(req: Request, res: Response) {
        const { id } = req.params;
        const access_token = req.header('authorization').split(' ')[1];

        try {
            const result = await this.tagService.deleteTagCascade({
                id: +id,
                access_token,
            });

            if (result && !result.status)
                return res.status(result.statusCode).send(result.text);

            res.sendStatus(200);
        } catch (error) {
            res.send(500);
        }
    }
    async getTagWithUser(req: Request, res: Response) {
        const { id } = req.params;
        const access_token = req.header('authorization').split(' ')[1];
        try {
            const result = await this.tagService.getTagWithUser({
                id: +id,
                access_token,
            });

            if (result === false) return res.status(404).send('Not found tags');
            res.send(result);
        } catch (error) {
            res.send(500);
        }
    }
}

export default TagController;
