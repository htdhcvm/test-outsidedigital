import bcrypt from 'bcrypt';

const comparePasswords = (
    passWordFromClient: string,
    hashFromDb: string
): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(passWordFromClient, hashFromDb, function (err, result) {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

export default comparePasswords;
