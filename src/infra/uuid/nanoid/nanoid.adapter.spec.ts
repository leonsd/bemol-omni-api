import * as nanoidModule from 'nanoid';

import { NanoidAdapter } from './nanoid.adapter';
import { Shortener } from '../../../data/protocols/uuid/shortener.protocol';

jest.mock('nanoid', () => {
  return {
    __esModule: true,
    nanoid: () => '123456',
  };
});

const makeSut = (): Shortener => {
  return new NanoidAdapter();
};

describe('Shortener Adapter', () => {
  test('Should throw if nanoid failed', async () => {
    const sut = makeSut();
    const size = 6;
    jest.spyOn(nanoidModule, 'nanoid').mockImplementationOnce(() => {
      throw new Error();
    });
    const fn = () => sut.shorten(size);

    expect(fn).toThrow(Error);
  });

  test('Should return code with success if pass size parameter', async () => {
    const sut = makeSut();
    const size = 6;
    const code = sut.shorten(size);

    expect(code).toBe('123456');
  });

  test('Should return code with success if no pass size parameter', async () => {
    const sut = makeSut();
    const code = sut.shorten();

    expect(code).toBe('123456');
  });
});
