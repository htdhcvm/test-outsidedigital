import Action from './Action';

class Update implements Action {
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

export default Update;
