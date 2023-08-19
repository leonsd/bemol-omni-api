import {
  AddAddress,
  AddAddressModel,
  AddAddressRepository,
  Address,
  AddressModel,
  AddressSearcher,
} from './add-address-usecase.protocol';

export class AddAddressUseCase implements AddAddress {
  constructor(
    private readonly addressSearcher: AddressSearcher,
    private readonly addAddressRepository: AddAddressRepository,
  ) {}

  async execute(addressData: AddAddressModel): Promise<AddressModel> {
    const addressSearched = await this.addressSearcher.findByZipCode(addressData.zipCode);
    const validatedAddress = this.prepareAddressData(addressData, addressSearched);

    return await this.addAddressRepository.add(validatedAddress);
  }

  private prepareAddressData(addressData: AddAddressModel, addressSearched: Address): AddAddressModel {
    const data = {
      ...addressData,
      street: addressSearched.street,
      neighborhood: addressSearched.neighborhood,
      city: addressSearched.city,
      state: addressSearched.state,
    };

    return data;
  }
}
