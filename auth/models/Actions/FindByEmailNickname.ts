import Action from './Action';
import FindUserDbResponse from '../../types/FindUserDbResponse';
import { Client } from 'pg';
import CheckUserParams from '../../types/CheckUserParams';

type PropsFindByEmailNickname = {
    tableName: string;
    email: string;
    nickname: string;
    connect: Client;
};

class FindByEmailNickname implements Action {
    private tableName: string;
    private email: string;
    private nickname: string;
    private connect: Client;

    constructor({
        tableName,
        email,
        nickname,
        connect,
    }: PropsFindByEmailNickname) {
        this.tableName = tableName;
        this.email = email;
        this.nickname = nickname;
        this.connect = connect;
    }
    doAction({
        email,
        nickname,
    }: CheckUserParams): Promise<null | FindUserDbResponse> {
        return new Promise((resolve, reject) => {
            this.connect.query(
                `SELECT * FROM ${this.tableName} WHERE ${this.email}=$1 AND ${this.nickname}=$2
                
            `,
                [email, nickname],

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

export default FindByEmailNickname;
