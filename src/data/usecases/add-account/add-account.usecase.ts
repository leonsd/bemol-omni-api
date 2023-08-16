import { map } from './helpers/mapper.helper';
import {
  AccountModel,
  AddAccountRepository,
  AddAccount,
  AddAccountWithAddressModel,
  AddAddressRepository,
} from './add-account.protocol';
import { AddAddressModel } from '../../../domain/usecases/add-address.usecase';
import { AddressModel } from '../../../domain/models/address.model';
import { Hasher } from '../../protocols/criptography/hasher';

export class AddAccountUseCase implements AddAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly addAddressRepository: AddAddressRepository,
  ) {}

  async execute(accountData: AddAccountWithAddressModel): Promise<AccountModel | null> {
    const passwordHashed = await this.hasher.hash(accountData.password);
    const account: AccountModel = await this.addAccountRepository.add({ ...accountData, password: passwordHashed });
    if (!account) {
      return null;
    }

    const addressData = this.prepareAddressData(account, accountData.address);
    const address: AddressModel = await this.addAddressRepository.add(addressData);

    return account && (map({ account, address }) as any);
  }

  private prepareAddressData(account: AccountModel, addressData: Omit<AddAddressModel, 'accountId'>) {
    const data = {
      accountId: account.id,
      ...addressData,
    };

    return data;
  }
}
