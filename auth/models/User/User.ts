import { Client } from 'pg';
import DbConnection from '../DbWorker';
import ClientDTOSignIn from '../../DTO/client/SignIn';
import CheckUserParams from '../../types/CheckUserParams';
import CreateUserResponse from '../../types/CreateUserResponse';
import Create from '../Actions/Create';
import Read from '../Actions/Read';
import FindByEmailNickname from '../Actions/FindByEmailNickname';
import Update from '../Actions/Update';
import Delete from '../Actions/Delete';
import Action from '../Actions/Action';

class User {
    private tableName: string = 'user_outside';
    private connect: Client;
    private uid: string = 'uid';
    private email: string = 'email';
    private password: string = 'password';
    private nickname: string = 'nickname';

    createAction: Action;
    readAction: Action;
    findByEmail: Action;
    update: Action;
    delete: Action;

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
        this.findByEmail = new FindByEmailNickname({
            tableName: this.tableName,
            email: this.email,
            nickname: this.nickname,
            connect: this.connect,
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
        return this.findByEmail.doAction({ email, nickname });
    }
}

export { User };
