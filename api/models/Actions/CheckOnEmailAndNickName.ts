import Action from './Action';
import { Client } from 'pg';
import {
    PropsCheckEmailNickname,
    ReturnCheckEmailNickname,
} from '../../types/Models/User/CheckOnEmailAndNickName';

type Props = {
    connect: Client;
    tableName: string;
    email: string;
    nickname: string;
    uid: string;
};

class CheckOnEmailAndNickName implements Action {
    private tableName: string;
    private connect: Client;

    private email: string;
    private nickname: string;
    private uid: string;

    constructor({ tableName, connect, email, nickname, uid }: Props) {
        this.connect = connect;
        this.tableName = tableName;
        this.email = email;
        this.nickname = nickname;
        this.uid = uid;
    }
    doAction({
        email,
        nickname,
    }: PropsCheckEmailNickname): Promise<ReturnCheckEmailNickname> {
        return new Promise((resolve, reject) => {
            this.connect.query(
                `
                SELECT COUNT(*) FROM ${this.tableName}
                WHERE ${email.length > 0 ? `${this.email}=$1` : ''} ${
                    email.length > 0 && nickname.length > 0 ? 'OR' : ''
                } ${nickname.length > 0 ? `${this.nickname}=$2` : ''}
            `,
                [email, nickname],
                (err, res) => {
                    if (err) return reject(err);
                    if (res.rows[0].count > 0) return resolve({ check: false });
                    resolve({ check: true });
                }
            );
        });
    }
}

export default CheckOnEmailAndNickName;
