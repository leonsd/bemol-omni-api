import { AccountModel } from '../models/account.model';

export interface AddAccountModel {
  username: string;
  gender: string;
  email: string;
  password: string;
}

export interface AddAccountWithAddressModel {
  username: string;
  gender: string;
  email: string;
  password: string;
  address: {
    zipCode: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
  };
}

export interface AddAccount {
  execute(accountData: AddAccountModel): Promise<AccountModel | null>;
}
