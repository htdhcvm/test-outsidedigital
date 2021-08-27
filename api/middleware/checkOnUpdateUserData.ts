import { Request, Response, NextFunction } from 'express';

const checkOnUpdateUserData = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email, password, nickname } = req.body;

    if (
        email === undefined &&
        password === undefined &&
        nickname === undefined
    ) {
        return res.status(400).send('At least one field is missing');
    }

    if (
        email &&
        email.length === 0 &&
        password &&
        password.length === 0 &&
        nickname &&
        nickname.length === 0
    ) {
        return res.status(400).send('All fields is empty');
    }

    next();
};

export default checkOnUpdateUserData;
