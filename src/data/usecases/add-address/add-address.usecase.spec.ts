import { AddAddressUseCase } from './add-address.usecase';
import { AddAddressModel, AddAddressRepository, AddressModel } from './add-address-usecase.protocol';

const makeFakeAddressData = () => {
  return {
    accountId: 'any_account_id',
    zipCode: 'valid_zipCode',
    street: 'valid_street',
    number: 'valid_number',
    complement: 'valid_complement',
    neighborhood: 'valid_neighborhood',
    city: 'valid_city',
    state: 'valid_state',
  };
};

const makeFakeAddress = () => {
  return {
    id: 'valid_id',
    zipCode: 'valid_zipCode',
    street: 'valid_street',
    number: 'valid_number',
    complement: 'valid_complement',
    neighborhood: 'valid_neighborhood',
    city: 'valid_city',
    state: 'valid_state',
  };
};

const makeAddAddressRepository = (): AddAddressRepository => {
  class AddAddressRepositoryStub implements AddAddressRepository {
    async add(addressData: AddAddressModel): Promise<AddressModel> {
      return makeFakeAddress();
    }
  }

  return new AddAddressRepositoryStub();
};

interface SutTypes {
  sut: AddAddressUseCase;
  addAddressRepositoryStub: AddAddressRepository;
}

const makeSut = () => {
  const addAddressRepositoryStub = makeAddAddressRepository();
  const sut = new AddAddressUseCase(addAddressRepositoryStub);

  return {
    sut,
    addAddressRepositoryStub,
  };
};

describe('AddAddress UseCase', () => {
  test('Should call Repository.add with correct values', async () => {
    const { sut, addAddressRepositoryStub } = makeSut();
    const addressData = makeFakeAddressData();
    const addSpy = jest.spyOn(addAddressRepositoryStub, 'add');

    sut.execute(addressData);
    expect(addSpy).toHaveBeenCalledWith(addressData);
  });
});
