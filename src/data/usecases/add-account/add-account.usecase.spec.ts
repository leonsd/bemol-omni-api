import { AddAccountUseCase } from './add-account.usecase';
import { AccountModel } from '../../../domain/models/account.model';
import {
  AddAccountWithAddressModel,
  AddAccountRepository,
  AddAddressRepository,
} from './add-account.protocol';
import { AddAddressModel } from '../../../domain/usecases/add-address.usecase';
import { AddressModel } from '../../../domain/models/address.model';

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
  addAccountRepositoryStub: AddAccountRepository;
  addAddressRepositoryStub: AddAddressRepository;
}

const makeSut = (): SutTypes => {
  const addAccountRepositoryStub = makeAccountRepositoryStub();
  const addAddressRepositoryStub = makeAddressRepositoryStub();
  const sut = new AddAccountUseCase(
    addAccountRepositoryStub,
    addAddressRepositoryStub,
  );

  return {
    sut,
    addAccountRepositoryStub,
    addAddressRepositoryStub,
  };
};

describe('AddAccount Usecase', () => {
  test('Should call addAccountRepository.add with correct value', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const accountData = makeFakeAccountWithAddressData();
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add');

    await sut.execute(accountData);
    expect(addSpy).toHaveBeenCalledWith(accountData);
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
