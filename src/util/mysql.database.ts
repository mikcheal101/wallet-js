import MySql from "mysql"
import Database from "./database";

class MysqlDatabase extends Database {

    public isConnected(): boolean {
        return MysqlDatabase._connected;
    }

    protected configure(): boolean {
        try {
            // lazy loading mysql connection only when needed
            if (!MysqlDatabase._connected) {
                MysqlDatabase._connection = MySql.createConnection({
                    host: process.env.DB_HOST,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASS,
                    database: process.env.DB_NAME
                });
            }
            return true;
        } catch (_) {
            return false;
        }
    }

    public connect(): boolean {
        if (MysqlDatabase._connection && !MysqlDatabase._connected) {
            try {
                MysqlDatabase._connection.connect();
                return true;
            }
            catch { }
        }
        return false;
    }

    disconnect(): boolean {
        if (MysqlDatabase._connection && MysqlDatabase._connected) {
            try {
                MysqlDatabase._connection.destroy();
                return true;
            } catch { }
        }

        return false;
    }

    query(queryStr: string) {
        let resultSet: any[] = [];
        
        if (MysqlDatabase._connected) {
            
            MysqlDatabase._connection.query(queryStr, (err: MySql.MysqlError, results: any[]) => {
                console.log("Error: ", err);
                console.log("results: ", results);
            });

            this.disconnect();
        }

        return resultSet;
    }
};

export default MysqlDatabase;