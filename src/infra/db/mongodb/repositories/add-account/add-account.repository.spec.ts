import { AddAccountMongoRepository } from './add-account.repository';
import { AddAccountModel } from './add-account-repository.protocol';
import { AccountEntity } from '../../entities/account.entity';
import { MongoHelper } from '../../helpers/mongo.helper';

const makeFakeAccountData = (): AddAccountModel => {
  return {
    username: 'valid_username',
    gender: 'valid_gender',
    email: 'valid_email',
    password: 'valid_password',
  };
};

const makeSut = (): AddAccountMongoRepository => {
  return new AddAccountMongoRepository();
};

describe('AddAccount Repository', () => {
  beforeAll(async () => {
    const uri = process.env.MONGO_URL ?? '';
    await MongoHelper.connect(uri);
  });

  beforeEach(async () => {
    await AccountEntity.deleteMany({});
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  test('Should add account with success', async () => {
    const sut = makeSut();
    const accountData = makeFakeAccountData();

    const account = await sut.add(accountData);
    expect(account).toBeTruthy();
    expect(account?.id).toBeTruthy();
    expect(account?.username).toBe(accountData.username);
    expect(account?.gender).toBe(accountData.gender);
    expect(account?.email).toBe(accountData.email);
  });

  test('Should return null if account already exists', async () => {
    const sut = makeSut();
    const accountData = makeFakeAccountData();
    await AccountEntity.create(accountData);

    const account = await sut.add(accountData);
    expect(account).toBe(null);
  });
});
