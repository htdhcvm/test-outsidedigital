import jwt from 'jsonwebtoken';

const checkAccessToken = (access_token: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        jwt.verify(
            access_token,
            process.env.JWT_SECRET_KEY,
            function (err, decoded) {
                if (decoded === undefined) return resolve(false);
                resolve(true);
            }
        );
    });
};

export default checkAccessToken;
