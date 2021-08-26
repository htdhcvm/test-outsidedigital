import Action from './Action';
import { Client } from 'pg';
import CreateNewRefresh from '../../types/CreateNewRefresh';
import { v4 as uuidv4 } from 'uuid';
import AfterCreateRefresh from '../../types/AfterCreateRefresh';

type PropsCreateRefresh = {
    tableName: string;
    id: string;
    refreshToken: string;
    expiresIn: string;
    userId: string;
    createdAt: string;
    connect: Client;
};

class CreateRefreshToken implements Action {
    private tableName: string;
    private id: string;
    private refreshToken: string;
    private expiresIn: string;
    private userId: string;
    private createdAt: string;
    private connect: Client;

    constructor({
        tableName,
        id,
        refreshToken,
        expiresIn,
        userId,
        createdAt,
        connect,
    }: PropsCreateRefresh) {
        this.tableName = tableName;
        this.id = id;
        this.refreshToken = refreshToken;
        this.expiresIn = expiresIn;
        this.userId = userId;
        this.createdAt = createdAt;
        this.connect = connect;
    }

    doAction({
        expiresin,
        userId,
        refreshToken,
    }: CreateNewRefresh): Promise<AfterCreateRefresh> {
        return new Promise((resolve, reject) => {
            this.connect.query(
                `
                INSERT INTO ${this.tableName} (${this.id}, ${this.refreshToken}, ${this.expiresIn}, ${this.userId}, ${this.createdAt})
                VALUES($1, $2, $3, $4, $5) 
                RETURNING ${this.id}, ${this.refreshToken}, ${this.expiresIn};
            `,
                [uuidv4(), refreshToken, expiresin, userId, new Date()],
                (err, res) => {
                    if (err) return reject(err);
                    resolve({
                        id: res.rows[0].id,
                        refreshToken: res.rows[0].refresh_token,
                        expiresIn: res.rows[0].expires_in,
                    });
                }
            );
        });
    }
}

export default CreateRefreshToken;
