export interface Address {
  zipCode: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface AddressSearcher {
  findAddressByZipCode(zipCode: string): Promise<Address | null>;
}