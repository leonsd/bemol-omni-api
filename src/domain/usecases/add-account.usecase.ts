import { AccountModel } from '../models/account.model';

export interface AddAccountModel {
  username: string;
  gender: string;
  email: string;
  password: string;
}

export interface AddAccount {
  execute(accountData: AddAccountModel): Promise<AccountModel | null>;
}
