import { Address, AddressSearcher, HttpClient, ViaCepAddress } from './viacep-client.protocol';
import { map } from './helpers/mapper.helper';

export class ViaCepClient implements AddressSearcher {
  constructor(private readonly httpClient: HttpClient) {}

  async findByZipCode(zipCode: string): Promise<Address | null> {
    const zipCodeSanitized = this.sanitizeZipCode(zipCode);
    const address = await this.httpClient.get<ViaCepAddress>(`https://viacep.com.br/ws/${zipCodeSanitized}/json/`);
    return !address.erro && map(address);
  }

  private sanitizeZipCode(zipCode: string): string {
    return zipCode.replace(/\D/g, '');
  }
}
