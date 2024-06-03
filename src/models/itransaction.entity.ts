import TransactionStatus from "./callup/transactionstatus.callup";
import IAccount from "./iaccount.entity";


interface ITransaction {
    id?: string;
    createdAt: Date;
    amount: number;
    account: IAccount;
    status: TransactionStatus;
    channel: Channel
};

export default ITransaction;