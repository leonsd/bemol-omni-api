import { AddressModel } from '../../../../domain/models/address.model';
import { AccountModel } from '../add-account.protocol';

export const map = (data: { account: AccountModel; address: AddressModel }) => {
  return {
    id: data.account.id,
    username: data.account.username,
    gender: data.account.gender,
    email: data.account.email,
    address: {
      zipCode: data.address.zipCode,
      street: data.address.street,
      number: data.address.number,
      complement: data.address.complement,
      neighborhood: data.address.neighborhood,
      city: data.address.city,
      state: data.address.state,
    },
  };
};
