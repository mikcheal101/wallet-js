import request from "supertest";
import DatabaseDirector from "../util/database.director";
import DatabaseType from "../util/databasetypes";
import IDatabaseQuery from "../util/idatabasequery.type";
import app from "../main";

let database = DatabaseDirector.getDataBase(DatabaseType.MySql);

let populateDb = `
        -- CREATE SCHEMA IF NOT EXISTS bank;
        CREATE SCHEMA IF NOT EXISTS banktest;

        -- CREATE DATABASE IF NOT EXISTS bank;
        -- CREATE DATABASE IF NOT EXISTS banktest;

        USE banktest;

        CREATE TABLE IF NOT EXISTS banktest.customer (
        id VARCHAR(100) NOT NULL,
        emailAddress VARCHAR(250) NOT NULL DEFAULT 0,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        firstName VARCHAR(200) NOT NULL,
        lastName VARCHAR(200) NOT NULL,
        middleName VARCHAR(100) NULL,
        address VARCHAR(100) NOT NULL,
        PRIMARY KEY (id),
        UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE
        ) ENGINE=InnoDB;

        CREATE TABLE IF NOT EXISTS banktest.account (
        id VARCHAR(100) NOT NULL,
        balance DOUBLE NOT NULL DEFAULT 0,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        ownerId VARCHAR(100) NOT NULL,
        status INT NOT NULL,
        PRIMARY KEY (id),
        UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE
        ) ENGINE=InnoDB;

        CREATE TABLE IF NOT EXISTS banktest.transaction (
        id VARCHAR(100) NOT NULL,
        amount DOUBLE NOT NULL DEFAULT 0,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        accountId VARCHAR(100) NOT NULL,
        status INT NOT NULL,
        channel INT NOT NULL,
        type INT NOT NULL,
        PRIMARY KEY (id),
        UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE
        ) ENGINE=InnoDB;

        ALTER TABLE banktest.account 
        ADD INDEX ownerId_idx (ownerId ASC) VISIBLE;

        ALTER TABLE banktest.account 
        ADD CONSTRAINT ownerId
        FOREIGN KEY (ownerId)
        REFERENCES banktest.customer (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE;

        ALTER TABLE banktest.transaction 
        ADD INDEX accountId_idx (accountId ASC) VISIBLE;

        ALTER TABLE banktest.transaction 
        ADD CONSTRAINT accountId
        FOREIGN KEY (accountId)
        REFERENCES banktest.account (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE;


        -- Seed Database
        INSERT INTO banktest.customer (id, emailAddress, firstName, lastName, middleName, address) VALUES ("53878cbc-3ac8-4877-981d-0ae900228655", "WesDKincaid@jourrapide.com", "Wes", "Kincaid", "d", "Nil");
        INSERT INTO banktest.customer (id, emailAddress, firstName, lastName, middleName, address) VALUES ("bbc522ae-a8b6-4573-8b47-ba77d8be3cd1", "JosephSNichols@rhyta.com", "Joseph", "Nichols", "s", "Yaba");

        INSERT INTO banktest.account (id, balance, ownerId, status) VALUES ("2718c2bc-2ff5-48ef-be55-5e85f8e74d9d", 200000, "53878cbc-3ac8-4877-981d-0ae900228655", 1);
        INSERT INTO banktest.account (id, balance, ownerId, status) VALUES ("7da99933-4ee9-47cb-82dc-c2b8ee52a93b", 50000, "bbc522ae-a8b6-4573-8b47-ba77d8be3cd1", 0);
    `;

/// scope
beforeAll(async () => {
    // populate a test db and destroy after use
    await database.connect();

    if (database.isConnected()) {

        const populateQuery = {
            queryString: populateDb,
            parameters: []
        };

        const created = await database.executeQueries([populateQuery]);
        console.log(`Created status: ${created}`);
    }
});

afterAll(async () => {
    // close the db connection
    await database.disconnect();
});

describe("Sample Wallet System 1.0", () => {

    it("can deposit successfully", async () => {
        const response = await request(app)
            .post("/api/v1/accounts/deposit")
            .send({
                "accountId": "53878cbc-3ac8-4877-981d-0ae900228655",
                "amount": 1000,
                "channel": "WEB"
            });

        expect(response.status).toBe(201);
        expect(response.body.status).toBe(true);
    });

    it("can withdraw successfully", async () => {
        const response = await request(app)
            .post("/api/v1/accounts/withdraw")
            .send({
                "accountId": "53878cbc-3ac8-4877-981d-0ae900228655",
                "amount": 2000,
                "channel": "WEB"
            });

        expect(response.status).toBe(201);
        expect(response.body.status).toBe(true);
    });

    it("cannot withdraw successfully, due to insufficient funds", async () => {
        const response = await request(app)
            .post("/api/v1/accounts/withdraw")
            .send({
                "accountId": "53878cbc-3ac8-4877-981d-0ae900228655",
                "amount": 300000,
                "channel": "WEB"
            });

        expect(response.status).toBe(400);
        expect(response.body.status).toBe(false);
    });

    it("can handle concurrent deposits", async () => {

        const depositamount = 100000;

        const responses = await Promise.all([
            request(app).post("/api/v1/accounts/deposit").send({
                "accountId": "53878cbc-3ac8-4877-981d-0ae900228655",
                "amount": depositamount,
                "channel": "WEB"
            }),
            request(app).post("/api/v1/accounts/deposit").send({
                "accountId": "53878cbc-3ac8-4877-981d-0ae900228655",
                "amount": depositamount,
                "channel": "WEB"
            }),
            request(app).post("/api/v1/accounts/deposit").send({
                "accountId": "53878cbc-3ac8-4877-981d-0ae900228655",
                "amount": depositamount,
                "channel": "WEB"
            })
        ]);

        responses.forEach((response) => {
            expect(response.status).toBe(201);
        });

        const finalBalance = await request(app).get("/api/v1/accounts/balance");
        expect(finalBalance.body.balance).toBe(500000);
    });

    it("can handle concurrent withdrawals", async () => {
        const withdrawalamount = 10000;

        const responses = await Promise.all([
            request(app).post("/api/v1/accounts/withdraw").send({
                "accountId": "53878cbc-3ac8-4877-981d-0ae900228655",
                "amount": withdrawalamount,
                "channel": "WEB"
            }),
            request(app).post("/api/v1/accounts/withdraw").send({
                "accountId": "53878cbc-3ac8-4877-981d-0ae900228655",
                "amount": withdrawalamount,
                "channel": "WEB"
            }),
            request(app).post("/api/v1/accounts/withdraw").send({
                "accountId": "53878cbc-3ac8-4877-981d-0ae900228655",
                "amount": withdrawalamount,
                "channel": "WEB"
            })
        ]);

        responses.forEach((response) => {
            expect(response.status).toBe(201);
        });

        const finalBalance = await request(app).get("/api/v1/accounts/balance");
        expect(finalBalance.body.balance).toBe(170000);
    });
});


export default database;