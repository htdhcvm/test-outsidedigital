import { Request, Response } from 'express';
import UserService from '../service/UserService';

class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    async getUserWithTags(req: Request, res: Response) {
        const access_token = req.header('authorization').split(' ')[1];

        try {
            const tagsUser = await this.userService.getUserWithTags({
                access_token,
            });

            if (tagsUser.status === false) {
                return res.status(tagsUser.statusCode).send(tagsUser.text);
            }

            res.status(200).send(tagsUser.data);
        } catch (error) {
            console.log(error);
            res.send(500);
        }
    }

    async deleteUser(req: Request, res: Response) {
        const access_token = req.header('authorization').split(' ')[1];

        try {
            const resultDelete = await this.userService.deleteUserAndLogout({
                access_token,
            });

            if (resultDelete.status === false)
                return res
                    .status(resultDelete.statusCode)
                    .send('Not found user');

            return res.send(resultDelete.statusCode);
        } catch (error) {
            res.send(500);
        }
    }
    async addTagsForUser(req: Request, res: Response) {
        const access_token = req.header('authorization').split(' ')[1];
        const { tags } = req.body;

        if (tags.length === 0) return res.status(200).send('Fill array');

        try {
            const tagsUser = await this.userService.addTagsForUser({
                access_token,
                tags,
            });

            if (tagsUser === false)
                return res.status(422).send("Some tags don't exist");
            res.send(tagsUser);
        } catch (error) {
            res.send(500);
        }
    }
    async updateDataUser(req: Request, res: Response) {
        const { email, password, nickname } = req.body;
        const access_token = req.header('authorization').split(' ')[1];

        const compareForValidation = {
            email: {
                check: email !== undefined ? true : false,
                value: email,
            },
            password: {
                check: password !== undefined ? true : false,
                value: password,
            },
            nickname: {
                check: nickname !== undefined ? true : false,
                value: nickname,
            },
        };

        try {
            const result = await this.userService.updateDataUser(
                compareForValidation,
                access_token
            );

            if (!result.status) return res.status(404).send(result.text);

            res.status(200).send(result.data);
        } catch (error) {
            res.send(500);
        }
    }

    async deleteTagAngGetAll(req: Request, res: Response) {
        const { id } = req.params;
        const access_token = req.header('authorization').split(' ')[1];

        try {
            const result = await this.userService.deleteTagGetAll({
                id: +id,
                access_token,
            });

            res.status(200).send(result);
        } catch (error) {
            res.send(500);
        }
    }

    async getListTagsOnUser(req: Request, res: Response) {
        const access_token = req.header('authorization').split(' ')[1];

        try {
            const result = await this.userService.getListTagsOnUser({
                access_token,
            });

            res.status(200).send(result);
        } catch (error) {
            res.send(500);
        }
    }
}

export default UserController;
