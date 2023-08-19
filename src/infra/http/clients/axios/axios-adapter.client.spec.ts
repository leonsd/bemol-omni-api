import axios from 'axios';
import { AxiosAdapter } from './axios-adapter.client';

jest.mock('axios', () => {
  return {
    get: () => 'any_response',
  };
});

const makeSut = () => {
  const sut = new AxiosAdapter();

  return { sut };
};

describe('Axios Adapter', () => {
  test('Should call axios.get with correct values', async () => {
    const { sut } = makeSut();
    const getSpy = jest.spyOn(axios, 'get');

    await sut.get('any_uri');
    expect(getSpy).toHaveBeenCalledWith('any_uri');
  });
});
