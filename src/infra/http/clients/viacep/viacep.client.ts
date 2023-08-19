import { Address, AddressSearcher, HttpClient, ViaCepAddress } from './viacep-client.protocol';
import { map } from './helpers/mapper.helper';

export class ViaCepClient implements AddressSearcher {
  constructor(private readonly httpClient: HttpClient) {}

  async findByZipCode(zipCode: string): Promise<Address | null> {
    const address = await this.httpClient.get<ViaCepAddress>(`viacep.com.br/ws/${zipCode}/json/`);
    return map(address);
  }
}
