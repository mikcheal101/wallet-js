import CustomerModel from "./customer.model";
import IAccount from "./iaccount.entity";
import ICustomer from "./icustomer.entity";
import ITransaction from "./itransaction.entity";
import DatabaseModel from "./model";
import AccountStatusEnum from "./accountstatus.entity";

class AccountModel extends DatabaseModel implements IAccount {
    status: AccountStatusEnum = AccountStatusEnum.PENDING;
    id?: string | undefined;
    balance: number = 0;
    createdAt: Date = new Date();
    owner: ICustomer = new CustomerModel;
    transactions?: ITransaction[] | undefined;

};

export default AccountModel;