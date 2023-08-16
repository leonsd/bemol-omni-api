import { AddAddressMongoRepository } from './add-address.repository';
import { AddressEntity } from '../../entities/address.entity';
import { MongoHelper } from '../../helpers/mongo.helper';
import { AddAddressModel } from '../../../../../domain/usecases/add-address.usecase';
import { Types } from 'mongoose';

const makeFakeAddressData = (): AddAddressModel<Types.ObjectId> => {
  return {
    accountId: MongoHelper.makeObjectId(),
    zipCode: 'valid_zip_code',
    street: 'valid_street',
    number: 'valid_number',
    complement: 'valid_complement',
    neighborhood: 'valid_neighborhood',
    city: 'valid_city',
    state: 'valid_state',
  };
};

const makeSut = (): AddAddressMongoRepository => {
  return new AddAddressMongoRepository();
};

describe('AddAddress Repository', () => {
  beforeAll(async () => {
    const uri = process.env.MONGO_URL ?? '';
    await MongoHelper.connect(uri);
  });

  beforeEach(async () => {
    await AddressEntity.deleteMany({});
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  test('Should add address with success', async () => {
    const sut = makeSut();
    const addressData = makeFakeAddressData();

    const address = await sut.add(addressData);
    expect(address).toBeTruthy();
    expect(address.id).toBeTruthy();
    expect(address.zipCode).toBe(addressData.zipCode);
    expect(address.street).toBe(addressData.street);
    expect(address.number).toBe(addressData.number);
    expect(address.complement).toBe(addressData.complement);
    expect(address.neighborhood).toBe(addressData.neighborhood);
    expect(address.city).toBe(addressData.city);
    expect(address.state).toBe(addressData.state);
  });
});
