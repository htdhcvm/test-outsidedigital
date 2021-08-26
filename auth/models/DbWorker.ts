import { Client } from 'pg';

class DbConnection {
    private static instanceConnection: Client;

    private static user: string = process.env.DB_USER;
    private static host: string = process.env.DB_HOST;
    private static database: string = process.env.DB_NAME;
    private static password: string = process.env.DB_PASSWORD;
    private static port: number = +process.env.DB_PORT;

    static connect(): Client {
        if (!DbConnection.instanceConnection) {
            DbConnection.instanceConnection = new Client({
                user: DbConnection.user,
                host: DbConnection.host,
                database: DbConnection.database,
                password: DbConnection.password,
                port: DbConnection.port,
            });

            DbConnection.instanceConnection
                .connect()
                .then(() => console.log('Connection established successfully'))
                .catch((e: any) => console.log(e));

            return DbConnection.instanceConnection;
        }
        return DbConnection.instanceConnection;
    }
}

export default DbConnection;
