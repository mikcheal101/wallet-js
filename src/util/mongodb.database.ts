import Database from "./database";

class MongoDbDatabase extends Database {


    protected configure(): boolean {
        throw new Error("Method not implemented.");
    }

    public isConnected(): boolean {
        throw new Error("Method not implemented.");
    }
    
    public connect(): boolean {
        throw new Error("Method not implemented.");
    }
    
    public disconnect(): boolean {
        throw new Error("Method not implemented.");
    }
    
    public query(queryStr: string) {
        throw new Error("Method not implemented.");
    }
};

export default MongoDbDatabase;