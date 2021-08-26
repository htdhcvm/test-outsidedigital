import Action from './Action';
import { Client } from 'pg';
import GetUserOnEmail from '../../types/GetUserOnEmail';
import FindByEmail from '../../types/FindByEmail';

type PropsFindByEmail = {
    tableName: string;
    connect: Client;
    email: string;
};

class FindByEmailAction implements Action {
    private tableName: string;
    private connect: Client;
    private email: string;

    constructor({ tableName, connect, email }: PropsFindByEmail) {
        this.tableName = tableName;
        this.connect = connect;
        this.email = email;
    }

    doAction({ email }: GetUserOnEmail): Promise<FindByEmail> {
        return new Promise((resolve, reject) => {
            this.connect.query(
                `
                SELECT * FROM ${this.tableName} WHERE ${this.email}=$1
            `,
                [email],
                (err, res) => {
                    if (err) return reject(err);
                    if (res.rowCount === 0) return resolve(null);
                    resolve({
                        uid: res.rows[0].uid,
                        email: res.rows[0].email,
                        password: res.rows[0].password,
                        nickname: res.rows[0].nickname,
                    });
                }
            );
        });
    }
}

export default FindByEmailAction;
