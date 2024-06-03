import AccountModel from "../models/account.model";
import AccountStatusEnum from "../models/accountstatus.entity";
import Channel from "../models/callup/channel.callup";
import TransactionStatus from "../models/callup/transactionstatus.callup";
import IAccount from "../models/iaccount.entity";
import Database from "../util/database";
import DatabaseDirector from "../util/database.director";
import DatabaseType from "../util/databasetypes";
import { v4 as uuid } from "uuid";
import IDatabaseQuery from "../util/idatabasequery.type";

class AccountService {

    private static _database: Database = DatabaseDirector.getDataBase(DatabaseType.MySql);

    constructor() {
        AccountService._database.connect();
    }

    public async depositFunds(accountNumber: string, amount: number, device: string): Promise<boolean> {

        if (AccountService._database.isConnected()) {

            // query string
            const queryString: string = `SELECT * FROM account where ownerid = ?`;

            // fetch account / wallet from database.
            const resultset = await AccountService._database.query(queryString, [accountNumber,]);

            // since its an array get the first element
            if (resultset && resultset.length > 0) {
                const _wallet: AccountModel = resultset[0];

                // confirm account can recieve funds, via account status
                if (_wallet.status == AccountStatusEnum.ACTIVE) {

                    // start acid operation 

                    // increment balance and update wallet.
                    const currentBalance = _wallet.balance + amount;

                    // create transaction and save to db
                    const _updatedWallet = await this.updateAccountBalance(currentBalance, amount, _wallet);

                    if (_updatedWallet) {

                        // successfully updated the wallet
                        return true;
                    }
                }
            }
        }

        return false;
    }

    public async withdrawFunds(accountNumber: string, amount: number, device: string): Promise<boolean> {

        if (AccountService._database.isConnected()) {
            // query string
            const queryString: string = `SELECT * FROM account where ownerid = ?`;

            // fetch account / wallet from database.
            const resultset = await AccountService._database.query(queryString, [accountNumber,]);

            // since its an array get the first element
            if (resultset && resultset.length > 0) {
                const _wallet: AccountModel = resultset[0];

                // confirm account can withdraw funds, via account status & balance.
                if (_wallet.status == AccountStatusEnum.ACTIVE && _wallet.balance > amount) {

                    // decrement balance and update wallet.
                    const currentBalance = _wallet.balance - amount;

                    // create transaction and save to db
                    const _updatedWallet = await this.updateAccountBalance(currentBalance, amount, _wallet);

                    if (_updatedWallet) {

                        // successfully updated the wallet
                        return true;
                    }
                }
            }

        }

        return false;

    }

    private async updateAccountBalance(currentBalance:number, amount: number, account: IAccount, shouldDebit:boolean = false): Promise<boolean> {

        try {
            // create sync lock

            // create transaction
            const _createTransactionQuery: IDatabaseQuery = {
                queryString: `INSERT INTO transaction (id, amount, accountId, status, channel, type) VALUES (?,?,?,?,?,?)`,
                parameters: [uuid(), amount, account.id, TransactionStatus.FULFILED, Channel.WEB, shouldDebit]
            }; 
            
            // update wallet balance
            const _updateWalletQuery: IDatabaseQuery = {
                queryString: `UPDATE account SET balance=? WHERE id=?`,
                parameters: [currentBalance, account.id]
            };
            
            const _updatedBalance = await AccountService._database.executeQueries([_createTransactionQuery, _updateWalletQuery]);

            // free lock

            // return result of both db transactions
            return _updatedBalance;

        } catch {

            return false;
        }

    }

};

export default AccountService;