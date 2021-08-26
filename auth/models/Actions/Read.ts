import Action from './Action';

class Read implements Action {
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

export default Read;
