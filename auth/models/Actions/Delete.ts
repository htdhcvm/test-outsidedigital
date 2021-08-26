import Action from './Action';

class Delete implements Action {
    private tableName: string;
    constructor(tableName: string) {
        this.tableName = tableName;
    }
    doAction(): Promise<void> {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
}

export default Delete;
