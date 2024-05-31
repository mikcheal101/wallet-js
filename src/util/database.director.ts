import Database from "./database";
import DatabaseType from "./databasetypes";
import MongoDbDatabase from "./mongodb.database";
import MysqlDatabase from "./mysql.database";

class DatabaseDirector {

    public static getDataBase(databaseType: DatabaseType): Database {

        let database: Database;

        switch (databaseType) {
            case DatabaseType.MongoDb:
                database = new MongoDbDatabase();
                break;
            case DatabaseType.MySql:
            default:

                database = new MysqlDatabase();
                break;
        }

        return database;
    }
};

export default DatabaseDirector;