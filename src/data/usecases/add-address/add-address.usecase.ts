import {
  AddAddress,
  AddAddressModel,
  AddAddressRepository,
  AddressModel,
  AddressSearcher,
} from './add-address-usecase.protocol';

export class AddAddressUseCase implements AddAddress {
  constructor(
    private readonly addressSearcher: AddressSearcher,
    private readonly addAddressRepository: AddAddressRepository,
  ) {}

  async execute(addressData: AddAddressModel): Promise<AddressModel> {
    await this.addressSearcher.findByZipCode(addressData.zipCode);
    const address = await this.addAddressRepository.add(addressData);

    return address;
  }
}
