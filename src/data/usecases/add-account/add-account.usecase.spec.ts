import { AddAccountUseCase } from './add-account.usecase';
import {
  AddAccountWithAddressModel,
  AddAccountRepository,
  AddAddressRepository,
  AddAddressModel,
  AccountModel,
} from './add-account.protocol';
import { AddressModel } from '../../../domain/models/address.model';
import { Hasher } from '../../protocols/criptography/hasher';

const makeFakeAccountWithAddressData = (): AddAccountWithAddressModel => {
  return {
    username: 'valid_username',
    gender: 'valid_gender',
    email: 'valid_email',
    password: 'valid_password',
    address: {
      ...makeFakeAddressData(),
    },
  };
};

const makeFakeAddressData = (): AddAddressModel => {
  return {
    accountId: 'valid_account_id',
    zipCode: 'valid_zip_code',
    street: 'valid_street',
    number: 'valid_number',
    complement: 'valid_complement',
    neighborhood: 'valid_neighborhood',
    city: 'valid_city',
    state: 'valid_state',
  };
};

const makeHasherStub = () => {
  class HasherStub implements Hasher {
    async hash(value: string): Promise<string> {
      return 'hashedValue';
    }
  }

  return new HasherStub();
};

const makeAccountRepositoryStub = () => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(): Promise<AccountModel | null> {
      return {
        id: 'valid_id',
        username: 'valid_username',
        gender: 'valid_gender',
        email: 'valid_email',
        password: 'valid_password',
      };
    }
  }

  return new AddAccountRepositoryStub();
};

const makeAddressRepositoryStub = () => {
  class AddAddressRepositoryStub implements AddAddressRepository {
    async add(): Promise<AddressModel> {
      return {
        id: 'valid_id',
        zipCode: 'valid_zip_code',
        street: 'valid_street',
        number: 'valid_number',
        complement: 'valid_complement',
        neighborhood: 'valid_neighborhood',
        city: 'valid_city',
        state: 'valid_state',
      };
    }
  }

  return new AddAddressRepositoryStub();
};

interface SutTypes {
  sut: AddAccountUseCase;
  hasherStub: Hasher;
  addAccountRepositoryStub: AddAccountRepository;
  addAddressRepositoryStub: AddAddressRepository;
}

const makeSut = (): SutTypes => {
  const hasherStub = makeHasherStub();
  const addAccountRepositoryStub = makeAccountRepositoryStub();
  const addAddressRepositoryStub = makeAddressRepositoryStub();
  const sut = new AddAccountUseCase(hasherStub, addAccountRepositoryStub, addAddressRepositoryStub);

  return {
    sut,
    hasherStub,
    addAccountRepositoryStub,
    addAddressRepositoryStub,
  };
};

describe('AddAccount Usecase', () => {
  test('Should call addAccountRepository.add with correct value', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const accountData = makeFakeAccountWithAddressData();
    const { address, ...account } = accountData;
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add');

    await sut.execute(accountData);
    expect(addSpy).toHaveBeenCalledWith({ ...account, password: 'hashedValue' });
  });

  test('Should throw if addAccountRepository.add throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const accountData = makeFakeAccountWithAddressData();
    jest.spyOn(addAccountRepositoryStub, 'add').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.execute(accountData);
    expect(promise).rejects.toThrow();
  });

  test('Should call addAddressRepository.add with correct value', async () => {
    const { sut, addAddressRepositoryStub } = makeSut();
    const accountData = makeFakeAccountWithAddressData();
    const executeSpy = jest.spyOn(addAddressRepositoryStub, 'add');

    await sut.execute(accountData);
    expect(executeSpy).toHaveBeenCalledWith(makeFakeAddressData());
  });

  test('Should return AccountModel if success', async () => {
    const { sut } = makeSut();
    const accountData = makeFakeAccountWithAddressData();

    const account = await sut.execute(accountData);
    expect(account).toBeTruthy();
    expect(account?.id).toBeTruthy();
    expect(account?.username).toBe('valid_username');
    expect(account?.gender).toBe('valid_gender');
    expect(account?.email).toBe('valid_email');
  });

  test('Should return null if addAccountRepository.add return null', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const accountData = makeFakeAccountWithAddressData();
    jest.spyOn(addAccountRepositoryStub, 'add').mockImplementationOnce(() => {
      return Promise.resolve(null);
    });

    const account = await sut.execute(accountData);
    expect(account).toBe(null);
  });
});
