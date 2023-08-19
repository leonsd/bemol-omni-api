import { ViaCepClient } from './viacep.client';
import { HttpClient } from '../../../data/protocols/http/client';

const makeAxiosAdapter = () => {
  class AxiosAdapterStub implements HttpClient {
    async get<T>(uri: string): Promise<T | null> {
      return 'any_return' as T;
    }
  }

  return new AxiosAdapterStub();
};

interface SutTypes {
  sut: ViaCepClient;
  axiosAdapterStub: HttpClient;
}

const makeSut = (): SutTypes => {
  const axiosAdapterStub = makeAxiosAdapter();
  const sut = new ViaCepClient(axiosAdapterStub);

  return {
    sut,
    axiosAdapterStub,
  };
};

describe('ViaCep Client', () => {
  test('Should call get with correct params', async () => {
    const { sut, axiosAdapterStub } = makeSut();
    const zipCode = 'any_zip_code';
    const getSpy = jest.spyOn(axiosAdapterStub, 'get');

    await sut.findAddressByZipCode(zipCode);
    expect(getSpy).toHaveBeenCalledWith(`viacep.com.br/ws/${zipCode}/json/`);
  });
});
