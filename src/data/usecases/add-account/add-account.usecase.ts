import { map } from './add-account.helper';
import {
  AccountModel,
  AddAccountRepository,
  AddAccount,
  AddAccountModel,
} from './add-account.protocol';

export class AddAccountUseCase implements AddAccount {
  constructor(private readonly addAccountRepository: AddAccountRepository) {}

  async execute(accountData: AddAccountModel): Promise<AccountModel | null> {
    const account = await this.addAccountRepository.add(accountData);
    return account && (map(account) as AccountModel);
  }
}
