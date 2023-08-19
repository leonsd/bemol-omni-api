import { ViaCepClient } from './viacep.client';
import { HttpClient } from '../../../../data/protocols/http/client';

const makeFakeViaCepAddress = () => {
  return {
    cep: '01001-000',
    logradouro: 'Praça da Sé',
    complemento: 'lado ímpar',
    bairro: 'Sé',
    localidade: 'São Paulo',
    uf: 'SP',
    ibge: '3550308',
    gia: '1004',
    ddd: '11',
    siafi: '7107',
  };
};

const makeFakeAddressSearched = () => {
  return {
    zipCode: '01001-000',
    street: 'Praça da Sé',
    complement: 'lado ímpar',
    neighborhood: 'Sé',
    city: 'São Paulo',
    state: 'SP',
  };
};

const makeAxiosAdapter = () => {
  class AxiosAdapterStub implements HttpClient {
    async get<T>(uri: string): Promise<T | null> {
      return makeFakeViaCepAddress() as T;
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
  test('Should call get with correct zipcode', async () => {
    const { sut, axiosAdapterStub } = makeSut();
    const zipCode = '01001000';
    const getSpy = jest.spyOn(axiosAdapterStub, 'get');

    await sut.findByZipCode(zipCode);
    expect(getSpy).toHaveBeenCalledWith(`https://viacep.com.br/ws/${zipCode}/json/`);
  });

  test('Should call get with zip code sanitized', async () => {
    const { sut, axiosAdapterStub } = makeSut();
    const zipCode = '0100-1000';
    const zipCodeSanitized = '01001000';
    const getSpy = jest.spyOn(axiosAdapterStub, 'get');

    await sut.findByZipCode(zipCode);
    expect(getSpy).toHaveBeenCalledWith(`https://viacep.com.br/ws/${zipCodeSanitized}/json/`);
  });

  test('Should return correct address on success', async () => {
    const { sut } = makeSut();

    const response = await sut.findByZipCode('any_zip_code');
    expect(response).toEqual(makeFakeAddressSearched());
  });

  test('Should throw if get throws', async () => {
    const { sut, axiosAdapterStub } = makeSut();
    jest.spyOn(axiosAdapterStub, 'get').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.findByZipCode('any_zip_code');
    await expect(promise).rejects.toThrow();
  });
});
