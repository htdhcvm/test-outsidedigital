import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const checkOnValidToken = (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.header('authorization').split(' ')[1];

    new Promise((resolve, reject) => {
        jwt.verify(
            access_token,
            process.env.JWT_SECRET_KEY,
            function (err, decoded) {
                if (decoded === undefined) return resolve(false);
                resolve(true);
            }
        );
    }).then((resultCheck) => {
        if (!resultCheck) return res.status(401).send('Token in not valid');
        next();
    });
};

export default checkOnValidToken;
