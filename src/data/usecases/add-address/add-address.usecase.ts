import { AddAddress, AddAddressModel, AddAddressRepository, AddressModel } from './add-address-usecase.protocol';

export class AddAddressUseCase implements AddAddress {
  constructor(private readonly addAddressRepository: AddAddressRepository) {}

  async execute(addressData: AddAddressModel): Promise<AddressModel> {
    await this.addAddressRepository.add(addressData);

    return null;
  }
}