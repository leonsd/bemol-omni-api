import { AccountModel } from '../../../domain/models/account.model';
import { AddAccountModel } from '../../usecases/add-account/add-account.protocol';

export interface AddAccountRepository {
  add(accountData: AddAccountModel): Promise<AccountModel | null>;
}
