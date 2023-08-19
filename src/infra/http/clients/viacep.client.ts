import { Address, AddressSearcher } from '../../../data/protocols/http/address-searcher';
import { HttpClient } from '../../../data/protocols/http/client';

export class ViaCepClient implements AddressSearcher {
  constructor(private readonly httpClient: HttpClient) {}

  async findAddressByZipCode(zipCode: string): Promise<Address | null> {
    await this.httpClient.get(`viacep.com.br/ws/${zipCode}/json/`);

    return null;
  }
}
