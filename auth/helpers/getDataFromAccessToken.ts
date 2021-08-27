import jwt from 'jsonwebtoken';

type ReturnUserData = {
    id: string;
    nickname: string;
};

const getDataFromAccessToken = (
    access_token: string
): Promise<ReturnUserData> => {
    return new Promise((resolve, reject) => {
        jwt.verify(
            access_token,
            process.env.JWT_SECRET_KEY,
            function (err, decoded) {
                if (err) return reject(err);
                resolve({
                    id: decoded.userId,
                    nickname: decoded.nickname,
                });
            }
        );
    });
};

export default getDataFromAccessToken;
