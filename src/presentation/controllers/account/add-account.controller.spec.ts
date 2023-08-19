import { AddAccountController } from './add-account.controller';
import { GenericObject, HttpRequest, Validation, AccountWithAddressModel, AddAccount } from './add-account.protocol';
import { ServerError } from '../../errors';
import { conflict } from '../../helpers/http/http.helper';

const makeFakeRequest = (): HttpRequest => {
  return {
    body: {
      username: 'any_username',
      gender: 'any_gender',
      email: 'any_email',
      password: 'any_password',
      address: {
        zipCode: 'any_zip_code',
        street: 'any_street',
        number: 'any_number',
        complement: 'any_complement',
        neighborhood: 'any_neighborhood',
        city: 'any_city',
        state: 'any_state',
      },
    },
  };
};

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: GenericObject): void | Error {}
  }

  return new ValidationStub();
};

const makeAddAccountStub = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    execute(): Promise<AccountWithAddressModel | null> {
      return Promise.resolve({
        id: 'valid_id',
        username: 'valid_username',
        gender: 'valid_gender',
        email: 'valid_email',
        password: 'valid_password',
        address: {
          zipCode: 'any_zip_code',
          street: 'any_street',
          number: 'any_number',
          complement: 'any_complement',
          neighborhood: 'any_neighborhood',
          city: 'any_city',
          state: 'any_state',
        },
      });
    }
  }

  return new AddAccountStub();
};

interface SutTypes {
  sut: AddAccountController;
  validationStub: Validation;
  addAccountStub: AddAccount;
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation();
  const addAccountStub = makeAddAccountStub();
  const sut = new AddAccountController(validationStub, addAccountStub);

  return {
    sut,
    validationStub,
    addAccountStub,
  };
};

describe('AddAccount Controller', () => {
  test('Should return 400 if no body is provided', async () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error());
    const httpRequest = {};

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });

  test('Should call addAccount.execute with correct value', async () => {
    const { sut, addAccountStub } = makeSut();
    const runSpy = jest.spyOn(addAccountStub, 'execute');
    const httpRequest = makeFakeRequest();

    await sut.handle(httpRequest);
    expect(runSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  test('Should return conflict with addAccount.execute return null', async () => {
    const { sut, addAccountStub } = makeSut();
    jest.spyOn(addAccountStub, 'execute').mockReturnValueOnce(Promise.resolve(null));
    const httpRequest = makeFakeRequest();

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(conflict('Email already registered'));
  });

  test('Should return 500 if addAccount.execute throws', async () => {
    const { sut, addAccountStub } = makeSut();
    jest.spyOn(addAccountStub, 'execute').mockImplementationOnce(() => {
      throw new Error('Server error');
    });
    const httpRequest = makeFakeRequest();

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('Should return 201 if success', async () => {
    const { sut } = makeSut();
    const httpRequest = makeFakeRequest();

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(201);
  });
});
