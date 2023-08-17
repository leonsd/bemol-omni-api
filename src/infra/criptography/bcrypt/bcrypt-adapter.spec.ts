import bcrypt from 'bcrypt';
import { BcryptAdapter } from './bcrypt-adapter';

jest.mock('bcrypt', () => {
  return {
    hash(): Promise<string> {
      return Promise.resolve('hashedValue');
    },
  };
});

interface SutTypes {
  sut: BcryptAdapter;
  salt: number;
}

const makeSut = (): SutTypes => {
  const salt = 12;
  const sut = new BcryptAdapter(salt);
  return { sut, salt };
};

describe('Bcrypt Adapter', () => {
  test('Should call hash with correct values', async () => {
    const { sut, salt } = makeSut();
    const hashSpy = jest.spyOn(bcrypt, 'hash');

    await sut.hash('any_value');
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
  });

  test('Should return a valid hash on hash success', async () => {
    const { sut } = makeSut();

    const hashedValue = await sut.hash('any_value');
    expect(hashedValue).toBe('hashedValue');
  });

  test('Should throw if bcrypt.hash throws', async () => {
    const { sut } = makeSut();
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.hash('any_value');
    expect(promise).rejects.toThrow();
  });
});
