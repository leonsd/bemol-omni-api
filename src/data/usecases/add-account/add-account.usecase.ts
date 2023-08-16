import { map } from './helpers/mapper.helper';
import {
  AccountModel,
  AddAccountRepository,
  AddAccount,
  AddAccountWithAddressModel,
  AddAddressRepository,
} from './add-account.protocol';
import { AddAddressModel } from '../../../domain/usecases/add-address.usecase';

export class AddAccountUseCase implements AddAccount {
  constructor(
    private readonly addAccountRepository: AddAccountRepository,
    private readonly addAddressRepository: AddAddressRepository,
  ) {}

  async execute(
    accountData: AddAccountWithAddressModel,
  ): Promise<AccountModel | null> {
    const account = await this.addAccountRepository.add(accountData);
    if (!account) {
      return null;
    }

    const addressData = this.prepareAddressData(account, accountData.address);
    await this.addAddressRepository.add(addressData);

    return account && (map(account) as AccountModel);
  }

  private prepareAddressData(
    account: AccountModel,
    addressData: Omit<AddAddressModel, 'accountId'>,
  ) {
    const data = {
      accountId: account.id,
      ...addressData,
    };

    return data;
  }
}
