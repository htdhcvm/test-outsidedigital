import Action from './Action';
import { v4 as uuidv4 } from 'uuid';
import { Client } from 'pg';
import ClientDTOSignIn from '../../DTO/client/SignIn';
import CreateUserResponse from '../../types/CreateUserResponse';

type PropsCreate = {
    tableName: string;
    uid: string;
    email: string;
    password: string;
    nickname: string;
    connect: Client;
};

class Create implements Action {
    private tableName: string;
    private uid: string;
    private connect: Client;
    private email: string;
    private password: string;
    private nickname: string;

    constructor({
        tableName,
        uid,
        email,
        password,
        nickname,
        connect,
    }: PropsCreate) {
        this.tableName = tableName;
        this.uid = uid;
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.connect = connect;
    }

    doAction({
        email,
        password,
        nickname,
    }: ClientDTOSignIn): Promise<CreateUserResponse> {
        return new Promise((resolve, reject) => {
            this.connect.query(
                `
                INSERT INTO ${this.tableName}(${this.uid}, ${this.email}, ${this.password}, ${this.nickname})
                VALUES($1, $2, $3, $4)
                RETURNING ${this.uid};
            `,
                [uuidv4(), email, password, nickname],
                (err, res) => {
                    if (err) return reject(err);
                    resolve({
                        uid: res.rows[0].uid,
                    });
                }
            );
        });
    }
}

export default Create;
