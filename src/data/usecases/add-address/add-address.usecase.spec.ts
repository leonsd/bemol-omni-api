import { AddAddressUseCase } from './add-address.usecase';
import {
  AddAddressModel,
  AddAddressRepository,
  Address,
  AddressModel,
  AddressSearcher,
} from './add-address-usecase.protocol';

const makeFakeAddressData = () => {
  return {
    accountId: 'any_account_id',
    zipCode: '01001000',
    street: 'any_street',
    number: 'any_number',
    complement: 'any_complement',
    neighborhood: 'any_neighborhood',
    city: 'any_city',
    state: 'any_state',
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

const makeFakeAddressSearched = () => {
  return {
    zipCode: 'valid_zipCode',
    street: 'valid_street',
    complement: 'valid_complement',
    neighborhood: 'valid_neighborhood',
    city: 'valid_city',
    state: 'valid_state',
  };
};

const makeAddressSearcher = (): AddressSearcher => {
  class AddressSearcherStub implements AddressSearcher {
    async findByZipCode(zipCode: string): Promise<Address | null> {
      return makeFakeAddressSearched();
    }
  }

  return new AddressSearcherStub();
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
  addressSearcherStub: AddressSearcher;
  addAddressRepositoryStub: AddAddressRepository;
}

const makeSut = (): SutTypes => {
  const addressSearcherStub = makeAddressSearcher();
  const addAddressRepositoryStub = makeAddAddressRepository();
  const sut = new AddAddressUseCase(addressSearcherStub, addAddressRepositoryStub);

  return {
    sut,
    addressSearcherStub,
    addAddressRepositoryStub,
  };
};

describe('AddAddress UseCase', () => {
  test('Should call addressSearcher.findByZipCode with correct values', async () => {
    const { sut, addressSearcherStub } = makeSut();
    const addressData = makeFakeAddressData();
    const findByZipCodeSpy = jest.spyOn(addressSearcherStub, 'findByZipCode');

    await sut.execute(addressData);
    expect(findByZipCodeSpy).toHaveBeenCalledWith(addressData.zipCode);
  });

  test('Should call addAddressRepository.add with correct values', async () => {
    const { sut, addAddressRepositoryStub } = makeSut();
    const addressData = makeFakeAddressData();
    const addressSearched = makeFakeAddressSearched();
    const addSpy = jest.spyOn(addAddressRepositoryStub, 'add');

    await sut.execute(addressData);
    expect(addSpy).toHaveBeenCalledWith({
      ...addressData,
      street: addressSearched.street,
      neighborhood: addressSearched.neighborhood,
      city: addressSearched.city,
      state: addressSearched.state,
    });
  });

  test('Should return address on success', async () => {
    const { sut } = makeSut();
    const addressData = makeFakeAddressData();

    const address = await sut.execute(addressData);
    expect(address).toEqual(makeFakeAddress());
  });
});
