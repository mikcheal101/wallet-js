import IDatabaseQuery from "./idatabasequery.type";

abstract class Database {

    constructor() {
        this.configure();
    }
    
    protected static _connection: any;
    protected static _connected: boolean;

    protected abstract configure(): Promise<boolean>;

    public isConnected(): boolean {
        return Database._connected;
    }
    
    public abstract connect(): Promise<boolean>;
    public abstract disconnect(): Promise<boolean>;

    /**
     * Method to execute INSERT, UPDATE and DELETE statements.
     * @param queryStr query string to execute.
     * @param params array of magic replacements.
     * @returns Promise<boolean> T - success / F - failure
     */
    public abstract execute(queryStr: string, params?: any[]): Promise<boolean>;
    
    /**
     * Method to run an array of queries.
     * @param queries 
     * @returns Promise<boolean> T - success / F - failure
     */
    public abstract executeQueries(queries: IDatabaseQuery[]): Promise<boolean>;


    /**
     * Method to query via SELECT statements.
     * @param queryStr query string to execute.
     * @param params array of magic replacements.
     * @returns Promise<any[]> array of models
     */
    public abstract query(queryStr: string, params?: any[]): Promise<any[]>;
};

export default Database;