import Action from './Action';
import { Client } from 'pg';

import {
    PropsIncomeSort,
    ReturnDataSortFromDb,
} from '../../types/Models/Tag/SortAndGetOnLimit';

type Props = {
    connect: Client;
    tableName: string;
    name: string;
    sortOrder: string;
    tableNameUser: string;
    uid: string;
};

class SortAndGetOnLimit implements Action {
    private connect: Client;
    private tableName: string;
    private name: string;
    private sortOrder: string;
    private tableNameUser: string;
    private uid: string;

    constructor({
        connect,
        tableName,
        name,
        sortOrder,
        tableNameUser,
        uid,
    }: Props) {
        this.connect = connect;
        this.tableName = tableName;
        this.name = name;
        this.sortOrder = sortOrder;
        this.tableNameUser = tableNameUser;
        this.uid = uid;
    }

    doAction({
        sortByOrder,
        sortByName,
        offset,
        length,
    }: PropsIncomeSort): Promise<ReturnDataSortFromDb> {
        return new Promise((resolve, reject) => {
            this.connect.query(
                `
                SELECT * FROM ${this.tableName}
                LEFT JOIN ${this.tableNameUser} on ${
                    this.tableName
                }.creator = ${this.tableNameUser}.${this.uid}
                ${
                    sortByOrder === true || sortByName === true
                        ? `
                    ORDER BY ${sortByOrder ? `${this.sortOrder}` : ''} ${
                              sortByOrder && sortByName ? ',' : ''
                          } ${sortByName ? `${this.name}` : ''} ASC
                `
                        : ''
                }
                LIMIT $1 OFFSET $2
            `,
                [length, offset],
                (err, res) => {
                    if (err) return reject(err);
                    resolve(res.rows);
                }
            );
        });
    }
}
export default SortAndGetOnLimit;
