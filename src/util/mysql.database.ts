import MySql from "mysql"
import Database from "./database";
import IDatabaseQuery from "./idatabasequery.type";

class MysqlDatabase extends Database {

    public executeQueries(queries: IDatabaseQuery[]): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    protected async configure(): Promise<boolean> {
        try {
            if (!Database._connected) {
                Database._connection = await MySql.createConnection({
                    host: process.env.DB_HOST,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASS,
                    database: process.env.DB_NAME
                });
            }
            return true;
        } catch (_) { }

        return false;
    }

    public async connect(): Promise<boolean> {
        if (Database._connection && !Database._connected) {
            try {
                await Database._connection.connect();
                Database._connected = true;
                return true;
            }
            catch { }
        }
        return false;
    }

    public async disconnect(): Promise<boolean> {
        if (Database._connection && Database._connected) {
            try {
                Database._connection.destroy();
                Database._connected = false;
                return true;
            } catch { }
        }

        return false;
    }

    public async query(queryStr: string, params?: any[]): Promise<any[]> {
        let resultSet: any[] = [];

        if (Database._connected) {

            Database._connection.query(queryStr, (err: MySql.MysqlError, results: any[]) => { });

            this.disconnect();
        }

        return resultSet;
    }

    public execute(queryStr: string, params?: any[] | undefined): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
};

export default MysqlDatabase;