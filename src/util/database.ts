abstract class Database {

    constructor() {
        this.configure();
    }
    
    protected static _connection: any;
    protected static _connected: boolean;

    protected abstract configure(): boolean;

    public abstract isConnected(): boolean;
    public abstract connect(): boolean;
    public abstract disconnect(): boolean;
    public abstract query(queryStr: string): any;
};

export default Database;