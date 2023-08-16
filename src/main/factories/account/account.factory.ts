import { AddAccountMongoRepository } from '../../../infra/db/mongodb/repositories/add-account/add-account.repository';
import { AddAccountUseCase } from '../../../data/usecases/add-account/add-account.usecase';
import { AddAccountController } from '../../../presentation/controllers/account/account.controller';
import { Controller } from '../../../presentation/protocols/controller.protocol';
import { makeAddAccountValidator } from './account-validation.factory';

export const makeAddAccountController = (): Controller => {
  const addAccountMongoRepository = new AddAccountMongoRepository();
  const validator = makeAddAccountValidator();
  const addAccount = new AddAccountUseCase(addAccountMongoRepository);

  return new AddAccountController(validator, addAccount);
};
