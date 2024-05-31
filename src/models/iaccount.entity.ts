import ICustomer from "./icustomer.entity";
import ITransaction from "./itransaction.entity";

interface IAccount {
    id?: string; // uuid
    balance: number;
    createdAt: Date;
    owner: ICustomer;
    transactions?: ITransaction[];
};

export default IAccount;