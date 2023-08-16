import { AddAccountMongoRepository } from '../../../infra/db/mongodb/repositories/add-account/add-account.repository';
import { AddAddressMongoRepository } from '../../../infra/db/mongodb/repositories/add-address/add-address.repository';
import { AddAccountUseCase } from '../../../data/usecases/add-account/add-account.usecase';
import { AddAccountController } from '../../../presentation/controllers/account/add-account.controller';
import { Controller } from '../../../presentation/protocols/controller.protocol';
import { makeAddAccountValidator } from './account-validation.factory';
import { BcryptAdapter } from '../../../infra/criptography/bcrypt/bcrypt-adapter';

export const makeAddAccountController = (): Controller => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const addAccountMongoRepository = new AddAccountMongoRepository();
  const addAddressMongoRepository = new AddAddressMongoRepository();
  const validator = makeAddAccountValidator();
  const addAccount = new AddAccountUseCase(bcryptAdapter, addAccountMongoRepository, addAddressMongoRepository);

  return new AddAccountController(validator, addAccount);
};
