import jwt from 'jsonwebtoken';

const getFromAccessTokenUserId = (access_token: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        jwt.verify(
            access_token,
            process.env.JWT_SECRET_KEY,
            function (err, decoded) {
                if (err) return reject(err);
                resolve(decoded.userId);
            }
        );
    });
};

export default getFromAccessTokenUserId;
