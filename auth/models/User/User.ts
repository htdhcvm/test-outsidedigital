import { Client } from 'pg';
import DbConnection from '../DbWorker';
import ClientDTOSignIn from '../../DTO/client/SignIn';
import CheckUserParams from '../../types/CheckUserParams';
import CreateUserResponse from '../../types/CreateUserResponse';
import Create from '../Actions/Create';
import Read from '../Actions/Read';
import FindByEmailNickname from '../Actions/FindByEmailNickname';
import FindByEmailAction from '../Actions/FindByEmailAction';
import Update from '../Actions/Update';
import Delete from '../Actions/Delete';
import Action from '../Actions/Action';
import GetUserOnEmail from '../../types/GetUserOnEmail';
import FindByEmail from '../../types/FindByEmail';

class User {
    private tableName: string = 'user_outside';
    private connect: Client;
    private uid: string = 'uid';
    private email: string = 'email';
    private password: string = 'password';
    private nickname: string = 'nickname';

    private createAction: Action;
    private readAction: Action;
    private findByEmailNicknameAction: Action;
    private findByEmailAction: Action;
    private update: Action;
    private delete: Action;

    constructor() {
        this.connect = DbConnection.connect();

        this.createAction = new Create({
            tableName: this.tableName,
            uid: this.uid,
            email: this.email,
            password: this.password,
            nickname: this.nickname,
            connect: this.connect,
        });
        this.readAction = new Read(this.tableName);
        this.findByEmailNicknameAction = new FindByEmailNickname({
            tableName: this.tableName,
            email: this.email,
            nickname: this.nickname,
            connect: this.connect,
        });

        this.findByEmailAction = new FindByEmailAction({
            tableName: this.tableName,
            connect: this.connect,
            email: this.email,
        });
        this.update = new Update(this.tableName);
        this.delete = new Delete(this.tableName);
    }

    async create({
        email,
        password,
        nickname,
    }: ClientDTOSignIn): Promise<CreateUserResponse> {
        return (await this.createAction.doAction({
            email,
            password,
            nickname,
        })) as CreateUserResponse;
    }

    async findByEmailNickname({ email, nickname }: CheckUserParams) {
        return this.findByEmailNicknameAction.doAction({ email, nickname });
    }

    async findByEmail({ email }: GetUserOnEmail): Promise<FindByEmail> {
        return (await this.findByEmailAction.doAction({
            email,
        })) as FindByEmail;
    }
}

export { User };
