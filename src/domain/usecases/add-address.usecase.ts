import { AddressModel } from '../models/address.model';

export interface AddAddressModel<T = any> {
  accountId: T;
  zipCode: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface AddAddress {
  execute(addressData: AddAddressModel): Promise<AddressModel>;
}
