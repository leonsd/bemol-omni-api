import { AccountEntity } from '../../entities/account.entity';
import { AddAccountRepository } from '../../../../../data/protocols/db/add-account-repository.protocol';
import { AccountModel } from '../../../../../domain/models/account.model';
import { MongoHelper } from '../../helpers/mongo.helper';
import { AddAccountModel } from '../../../../../domain/usecases/add-account.usecase';

export class AddAccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    return null;
  }
}
