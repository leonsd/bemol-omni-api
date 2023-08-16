import { AddAccountUseCase } from './add-account.usecase';
import { AccountModel } from '../../../domain/models/account.model';
import { AddAccountModel, AddAccountRepository } from './add-account.protocol';

const makeFakeAccountData = (): AddAccountModel => {
  return {
    username: 'valid_username',
    gender: 'valid_gender',
    email: 'valid_email',
    password: 'valid_password',
  };
};

const makeAccountRepositoryStub = () => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(): Promise<AccountModel | null> {
      return {
        id: 'valid_id',
        username: 'valid_username',
        gender: 'valid_gender',
        password: 'valid_password',
      };
    }
  }

  return new AddAccountRepositoryStub();
};

const makeSut = () => {
  const addAccountRepositoryStub = makeAccountRepositoryStub();
  const sut = new AddAccountUseCase(addAccountRepositoryStub);

  return {
    sut,
    addAccountRepositoryStub,
  };
};

describe('AddAccount Usecase', () => {
  test('Should call addAccountRepository.add with correct value', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const accountData = makeFakeAccountData();
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add');

    await sut.execute(accountData);
    expect(addSpy).toHaveBeenCalledWith(accountData);
  });

  test('Should throw if addAccountRepository.add throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const accountData = makeFakeAccountData();
    jest.spyOn(addAccountRepositoryStub, 'add').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.execute(accountData);
    expect(promise).rejects.toThrow();
  });

  test('Should return AccountModel if success', async () => {
    const { sut } = makeSut();
    const accountData = makeFakeAccountData();

    const account = await sut.execute(accountData);
    expect(account).toBeTruthy();
    expect(account?.id).toBeTruthy();
    expect(account?.username).toBe('valid_username');
    expect(account?.gender).toBe('valid_gender');
  });

  test('Should return null if addAccountRepository.add return null', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const accountData = makeFakeAccountData();
    jest.spyOn(addAccountRepositoryStub, 'add').mockImplementationOnce(() => {
      return Promise.resolve(null);
    });

    const account = await sut.execute(accountData);
    expect(account).toBe(null);
  });
});
