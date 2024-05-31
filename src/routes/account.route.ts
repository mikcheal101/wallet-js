import { Router } from "express";
import AccountController from "../controllers/account.controller";

class AccountRoute {
    private _router: Router;
    private _controller: AccountController;

    constructor() {
        this._router = Router();
        this._controller = new AccountController();
        this.initialize();
    }

    initialize() {
        this._router.post("/deposit", this._controller.Deposit);
        this._router.post("/withdraw", this._controller.Withdraw);
    }

    public getRouter(): Router {
        return this._router;
    }
};

export default new AccountRoute().getRouter();