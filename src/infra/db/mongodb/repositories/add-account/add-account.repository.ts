import { AccountModel, AddAccountRepository, AddAccountModel } from './add-account-repository.protocol';
import { AccountEntity } from '../../entities/account.entity';
import { MongoHelper } from '../../helpers/mongo.helper';

export class AddAccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const alreadyExists = await AccountEntity.findOne({
      email: accountData.email,
    });
    if (alreadyExists) {
      return null;
    }

    const account = await AccountEntity.create(accountData);
    return MongoHelper.map(account);
  }
}
