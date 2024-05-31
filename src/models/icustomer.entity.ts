import IAccount from "./iaccount.entity";

interface ICustomer {
    id?: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    email: string;
    address: string;
    wallet?: IAccount;
};

export default ICustomer;