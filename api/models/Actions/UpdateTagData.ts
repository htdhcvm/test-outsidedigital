import Action from './Action';

import { Client } from 'pg';

import {
    PropInComeUpdateTagData,
    ReturnUpdateTagData,
} from '../../types/Models/Tag/UpdateTagData';

type Props = {
    tableName: string;
    connect: Client;
    creator: string;
    id: string;
    name: string;
    sortOrder: string;
};

class UpdateTagData implements Action {
    private tableName: string;
    private creator: string;
    private id: string;
    private name: string;
    private sortOrder: string;
    private connect: Client;

    constructor({ tableName, connect, creator, id, name, sortOrder }: Props) {
        this.creator = creator;
        this.tableName = tableName;
        this.id = id;
        this.name = name;
        this.sortOrder = sortOrder;
        this.connect = connect;
    }
    async doAction({
        userId,
        id,
        name,
        sortOrder,
    }: PropInComeUpdateTagData): Promise<ReturnUpdateTagData> {
        return new Promise((resolve, reject) => {
            let markCheck = false;
            let queryString = ``;
            const params = [];
            if (!markCheck && name && sortOrder !== undefined && sortOrder) {
                queryString = `
                    UPDATE ${this.tableName}
                    SET ${this.name}=$1 , ${this.sortOrder}=$2
                    WHERE ${this.creator}=$3 AND ${this.id}=$4
                    RETURNING * 
                `;

                params.push(name);
                params.push(sortOrder);
                params.push(userId);
                params.push(id);
                markCheck = true;
            }

            if (!markCheck && name !== undefined) {
                queryString = `
                    UPDATE ${this.tableName}
                    SET ${this.name}=$1 
                    WHERE ${this.creator}=$2 AND ${this.id}=$3
                    RETURNING * 
                `;
                params.push(name);
                params.push(userId);
                params.push(id);
                markCheck = true;
            }
            if (!markCheck && sortOrder !== undefined && sortOrder) {
                queryString = `
                    UPDATE ${this.tableName}
                    SET ${this.sortOrder}=$1
                    WHERE ${this.creator}=$2 AND ${this.id}=$3
                    RETURNING * 
                `;

                params.push(sortOrder);
                params.push(userId);
                params.push(id);
                markCheck = true;
            }

            params;
            this.connect.query(queryString, params, (err, res) => {
                if (err) return reject(err);
                resolve({
                    name: res.rows[0].name,
                    sortOrder: res.rows[0].sort_order,
                });
            });
        });
    }
}

export default UpdateTagData;
