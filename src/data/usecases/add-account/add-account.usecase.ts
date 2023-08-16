import {
  AccountModel,
  AddAccountRepository,
  AddAccount,
  AddAccountModel,
} from './add-account.protocol';

export class AddAccountUseCase implements AddAccount {
  constructor(private readonly addAccountRepository: AddAccountRepository) {}

  async execute(accountData: AddAccountModel): Promise<AccountModel | null> {
    return await this.addAccountRepository.add(accountData);
  }
}
