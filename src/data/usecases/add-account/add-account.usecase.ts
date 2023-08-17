import { map } from './helpers/mapper.helper';
import {
  AccountModel,
  AddAccountRepository,
  AddAccount,
  AddAccountWithAddressModel,
  AddAddressRepository,
  AddAddressModel,
  Hasher,
  AddAccountModel,
  AccountWithAddressModel,
} from './add-account.protocol';

export class AddAccountUseCase implements AddAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly addAddressRepository: AddAddressRepository,
  ) {}

  async execute(accountData: AddAccountWithAddressModel): Promise<AccountWithAddressModel | null> {
    const hashedPassword = await this.hasher.hash(accountData.password);
    const accountWithHashedPassword = this.prepareAccountData(accountData, hashedPassword);
    const account = await this.addAccountRepository.add(accountWithHashedPassword);
    if (!account) {
      return null;
    }

    const addressData = this.prepareAddressData(account, accountData.address);
    const address = await this.addAddressRepository.add(addressData);

    return map({ account, address });
  }

  private prepareAccountData(accountData: AddAccountWithAddressModel, hashedPassword: string): AddAccountModel {
    const { address, ...account } = accountData;
    const data = { ...account, password: hashedPassword };

    return data;
  }

  private prepareAddressData(account: AccountModel, addressData: Omit<AddAddressModel, 'accountId'>): AddAddressModel {
    const data = { accountId: account.id, ...addressData };
    return data;
  }
}
