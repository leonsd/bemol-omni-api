import { AddAccountMongoRepository } from '../../../infra/db/mongodb/repositories/add-account/add-account.repository';
import { AddAddressMongoRepository } from '../../../infra/db/mongodb/repositories/add-address/add-address.repository';
import { ViaCepClient } from '../../../infra/http/clients/viacep/viacep.client';
import { AxiosAdapter } from '../../../infra/http/clients/axios/axios-adapter.client';
import { AddAccountUseCase } from '../../../data/usecases/add-account/add-account.usecase';
import { AddAddressUseCase } from '../../../data/usecases/add-address/add-address.usecase';
import { AddAccountController } from '../../../presentation/controllers/account/add-account.controller';
import { Controller } from '../../../presentation/protocols/controller.protocol';
import { makeAddAccountValidator } from './account-validation.factory';
import { BcryptAdapter } from '../../../infra/criptography/bcrypt/bcrypt-adapter';
import { env } from '../../config/env.config';

export const makeAddAccountController = (): Controller => {
  const bcryptAdapter = new BcryptAdapter(env.hashSalt);
  const addAccountMongoRepository = new AddAccountMongoRepository();
  const addAddressMongoRepository = new AddAddressMongoRepository();
  const validator = makeAddAccountValidator();
  const axiosAdapter = new AxiosAdapter();
  const addressSearcher = new ViaCepClient(axiosAdapter);
  const addAddress = new AddAddressUseCase(addressSearcher, addAddressMongoRepository);
  const addAccount = new AddAccountUseCase(bcryptAdapter, addAddress, addAccountMongoRepository);

  return new AddAccountController(validator, addAccount);
};
