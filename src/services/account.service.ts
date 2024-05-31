import IAccount from "../models/iaccount.entity";
import Database from "../util/database";
import DatabaseDirector from "../util/database.director";
import DatabaseType from "../util/databasetypes";

class AccountService {

    private static _database: Database = DatabaseDirector.getDataBase(DatabaseType.MySql);

    constructor() {

        AccountService._database.connect();
    }

    public depositFunds(accountNumber: string, amount: number, device: string): boolean {

        if (AccountService._database.isConnected()) {

            // query string
            let queryString: string = `SELECT * FROM account where accountId = ${accountNumber}`;

            // fetch account / wallet from database.
            let resultset = AccountService._database.query(queryString);

            // confirm account can recieve funds, via account status

            // start acid operation 

            // increment balance and update wallet.

            // create transaction and save to db

            // end acid.

        }

        return false;
    }

    public withdrawFunds(accountNumber: string, amount: number, device: string): boolean {

        // fetch account / wallet from database.

        // confirm account can withdraw funds, via account status & balance.

        // start acid operation 

        //: updateAccountBalance

        // create transaction and save to db

        // end acid.

        return false;

    }


    private updateAccountBalance(amount: number, account: IAccount): boolean {

        // create acid lock

        // increment / decrement balance and update wallet balance in db.

        // free lock

        return false;

    }

};

export default AccountService;