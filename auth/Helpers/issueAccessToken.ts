import jwt from 'jsonwebtoken';

type Props = {
    id: string;
};

const issueAccessToken = ({ id }: Props): Promise<string> => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            {
                userId: id,
            },
            process.env.JWT_SECRET_KEY,
            {
                algorithm: 'HS512',
                subject: '' + id,
                expiresIn: +process.env.JWT_EXPIRE_ACCESS_TOKEN,
            },
            (error, token) => {
                if (error) reject(error);
                resolve(token);
            }
        );
    });
};

export default issueAccessToken;
