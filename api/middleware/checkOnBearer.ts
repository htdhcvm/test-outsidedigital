import { Request, Response, NextFunction } from 'express';

const checkOnBearer = (req: Request, res: Response, next: NextFunction) => {
    if (req.header('authorization') === undefined)
        return res.status(401).send('Not use Bearer');

    const authHeader = req.header('authorization').split(' ');
    if (authHeader[0] !== 'Bearer')
        return res.status(401).send('Not use Bearer');
    next();
};

export default checkOnBearer;
