import { Request, Response, response } from "express";
import AccountService from "../services/account.service";

class AccountController {

    private _accountService: AccountService = new AccountService;

    public Deposit(req: Request, res: Response) {
        let request: { accountId: string, amount: number, deviceId: string } = req.body;

        // send a request to deposit and send response accordingly
        if (this._accountService.depositFunds(request.accountId, request.amount, request.deviceId)) {

            response.status(201).json({ status: true, mesaage: "Deposit Succesfull!" });
        }

        response.status(400).json({ status: false, message: "", balance: 0 });
    }

    public Withdraw(req: Request, res: Response) {
        let request: { accountId: string, amount: number, deviceId: string } = req.body;
        
        // send a request to withdraw and send response accordingly
        if (this._accountService.withdrawFunds(request.accountId, request.amount, request.deviceId)) {

            response.status(201).json({ status: true, mesaage: "Deposit Succesfull!" });
        }

        response.status(400).json({ status: false, message: "", balance: 0 });

    }

};

export default AccountController;