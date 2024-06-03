import IAccountStatus from "./accountstatus.entity";
import ICustomer from "./icustomer.entity";
import ITransaction from "./itransaction.entity";

interface IAccount {
    id?: string; // uuid
    balance: number;
    createdAt: Date;
    owner: ICustomer;
    status: IAccountStatus;
    transactions?: ITransaction[];
};

export default IAccount;