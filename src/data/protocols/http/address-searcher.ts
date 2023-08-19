export interface Address {
  zipCode: string;
  street: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface AddressSearcher {
  findByZipCode(zipCode: string): Promise<Address | null>;
}
