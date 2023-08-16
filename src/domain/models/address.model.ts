import { AccountModel } from './account.model';

export interface AddressModel {
  id: string;
  zipCode: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  state: string;
  city: string;
  accountId?: AccountModel;
}
