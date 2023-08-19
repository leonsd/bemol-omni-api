import { AccountModel } from './account.model';

export interface AddressModel {
  id: string;
  zipCode: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  accountId?: AccountModel;
}
