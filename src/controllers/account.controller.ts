import { Request, Response, response } from "express";
import AccountService from "../services/account.service";

class AccountController {

    private static _accountService: AccountService = new AccountService();

    public async Deposit(req: Request, response: Response): Promise<void> {
        const request: { accountId: string, amount: number, deviceId: string } = req.body;

        // send a request to deposit and send response accordingly
        if (await AccountController._accountService.depositFunds(request.accountId, request.amount, request.deviceId)) {

            response.status(201).json({ status: true, mesaage: "Deposit Succesfull!" });

        } else {

            response.status(400).json({ status: false, message: "An Error occured while depositing funds", balance: 0 });
        }

    }

    public async Withdraw(req: Request, response: Response): Promise<void> {
        const request: { accountId: string, amount: number, deviceId: string } = req.body;

        // send a request to withdraw and send response accordingly
        if (await AccountController._accountService.withdrawFunds(request.accountId, request.amount, request.deviceId)) {

            response.status(201).json({ status: true, mesaage: "Withdrawal Succesfull!" });

        } else {

            response.status(400).json({ status: false, message: "An Error occured while withdrawing funds", balance: 0 });

        }
    }

};

export default AccountController;