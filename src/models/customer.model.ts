import IAccount from "./iaccount.entity";
import ICustomer from "./icustomer.entity";
import DatabaseModel from "./model";

class CustomerModel extends DatabaseModel implements ICustomer {
    id?: string | undefined;
    firstName: string = "";
    lastName: string = "";
    middleName?: string | undefined = "";
    email: string = "";
    address: string = "";
    wallet?: IAccount | undefined;
    
};

export default CustomerModel;