import Database from "./database";
import Mysql from "mysql2/promise";
import dotenv from "dotenv";
import IDatabaseQuery from "./idatabasequery.type";
dotenv.config();

class Mysql2 extends Database {

    protected async configure(): Promise<boolean> {
        try {
            // Lazy load database
            if (!Database._connected) {
                const connection: Mysql.Connection = await Mysql.createConnection({
                    host: process.env.MYSQLDB_HOST,
                    user: process.env.MYSQLDB_USER,
                    password: process.env.MYSQLDB_PASSWORD,
                    database: process.env.MYSQLDB_DATABASE,
                    waitForConnections: true,
                    connectionLimit: 10,
                    queueLimit: 0
                });

                Database._connection = connection;
            }
            return true;

        } catch (err) {
            // log db error here: Unable to configure connection to database error.
        }

        return false;
    }

    public async connect(): Promise<boolean> {

        // since it has no connect method we return true by default
        if (!Database._connection) {
            await this.configure();
        }

        if (Database._connection && !Database._connected) {

            await Database._connection.connect();
            Database._connected = true;
            return true;

        } else {

            // log db error here: Unable to connect.
            return false;
        }
    }

    public async disconnect(): Promise<boolean> {
        if (Database._connection && Database._connected) {

            await Database._connection.destroy();
            Database._connected = false;
            return true;

        } else {

            // log db error here: Unable to disconnect from database
            return false;
        }
    }

    public async query(queryStr: string, params?: any[]): Promise<any[]> {

        let data: any[] = [];

        try {
            const [rows] = await Database._connection.query(queryStr, params);
            data = [...rows];

        } catch { }

        return data;
    }

    public async executeQueries(queries: IDatabaseQuery[]): Promise<boolean> {

        try {
            await Database._connection.beginTransaction();

            queries.forEach(async (query: IDatabaseQuery) => await Database._connection.query(query.queryString, query.parameters));

            await Database._connection.commit();

            return true;

        } catch (err) {
            await Database._connection.rollback();
        }

        return false;
    }

    public async execute(queryStr: string, params?: any[] | undefined): Promise<boolean> {

        try {
            await Database._connection.beginTransaction();

            await Database._connection.query(queryStr, params);

            await Database._connection.commit();
            
            return true;

        } catch (err) {
            await Database._connection.rollback();
        }

        return false;
    }

};

export default Mysql2;