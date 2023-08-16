import { AddressModel } from '../../../domain/models/address.model';
import { AddAddressModel } from '../../../domain/usecases/add-address.usecase';

export interface AddAddressRepository {
  add(addressData: AddAddressModel): Promise<AddressModel>;
}
