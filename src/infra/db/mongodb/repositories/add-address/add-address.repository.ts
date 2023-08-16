import { AddressModel } from '../../../../../domain/models/address.model';
import { AddAddressModel } from '../../../../../domain/usecases/add-address.usecase';
import { AddAddressRepository } from '../../../../../data/protocols/db/add-address-repository.protocol';
import { AddressEntity } from '../../entities/address.entity';

export class AddAddressMongoRepository implements AddAddressRepository {
  async add(addressData: AddAddressModel): Promise<AddressModel> {
    const address = await AddressEntity.create(addressData);
    return address;
  }
}
