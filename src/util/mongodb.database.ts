import Database from "./database";
import IDatabaseQuery from "./idatabasequery.type";

class MongoDbDatabase extends Database {
    
    public executeQueries(queries: IDatabaseQuery[]): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
    public execute(queryStr: string, params?: any[] | undefined): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    protected configure(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
    public connect(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
    public disconnect(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
    public query(queryStr: string, params?: any[]): Promise<any[]> {
        throw new Error("Method not implemented.");
    }
};

export default MongoDbDatabase;