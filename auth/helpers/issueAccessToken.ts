import jwt from 'jsonwebtoken';

type Props = {
    id: string;
    nickname: string;
};

const issueAccessToken = ({ id, nickname }: Props): Promise<string> => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            {
                userId: id,
                nickname,
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
