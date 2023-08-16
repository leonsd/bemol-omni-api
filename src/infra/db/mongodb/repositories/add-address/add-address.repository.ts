import { AddressModel } from '../../../../../domain/models/address.model';
import { AddAddressModel } from '../../../../../domain/usecases/add-address.usecase';
import { AddAddressRepository } from '../../../../../data/protocols/db/add-address-repository.protocol';
import { AddressEntity } from '../../entities/address.entity';
import { MongoHelper } from '../../helpers/mongo.helper';

export class AddAddressMongoRepository implements AddAddressRepository {
  async add(addressData: AddAddressModel): Promise<AddressModel> {
    const address = await AddressEntity.create(addressData);
    return MongoHelper.map(address);
  }
}
