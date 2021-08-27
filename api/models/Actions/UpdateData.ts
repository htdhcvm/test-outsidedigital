import Action from './Action';
import { Client } from 'pg';
import {
    PropsInComeUpdateUser,
    ReturnDataUpdateUser,
} from '../../types/Models/User/UpdateData';

type Props = {
    tableName: string;
    connect: Client;
    uid: string;
    email: string;
    password: string;
    nickname: string;
};

class UpdateData implements Action {
    private tableName: string;
    private uid: string;
    private connect: Client;
    private email: string;
    private password: string;
    private nickname: string;

    constructor({ tableName, connect, uid, email, password, nickname }: Props) {
        this.uid = uid;
        this.tableName = tableName;
        this.connect = connect;
        this.email = email;
        this.password = password;
        this.nickname = nickname;
    }
    async doAction({
        userId,
        email,
        password,
        nickname,
    }: PropsInComeUpdateUser): Promise<ReturnDataUpdateUser> {
        return new Promise((resolve, reject) => {
            this.connect.query(
                `
                UPDATE ${this.tableName}
                SET ${email.length > 0 ? `${this.email}=$1,` : ''} 
                ${password.length > 0 ? `${this.password}=$2,` : ''} 
                ${nickname.length > 0 ? `${this.nickname}=$3` : ''} 
                WHERE ${this.uid}=$4
                RETURNING ${this.email}, ${this.nickname}
            `,
                [email, password, nickname, userId],
                (err, res) => {
                    if (err) return reject(err);
                    if (res.rowCount === 0) return resolve(false);
                    resolve({
                        email: res.rows[0].email,
                        nickname: res.rows[0].nickname,
                    });
                }
            );
        });
    }
}

export default UpdateData;
