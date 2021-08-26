import bcrypt from 'bcrypt';

const getHash = (password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, +process.env.SALT, function (err, hash) {
            if (err) return reject(err);
            resolve(hash);
        });
    });
};

export default getHash;
