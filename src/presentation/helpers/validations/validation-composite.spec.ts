import { ValidationComposite } from './validation-composite';
import { GenericObject, Validation } from '../../protocols/validation.protocol';
import { InvalidParamError, MissingParamError } from '../../errors';

const makeFakeObject = () => {
  return {
    property: 'any_property',
  };
};

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: GenericObject): void | Error {}
  }

  return new ValidationStub();
};

interface SutTypes {
  sut: ValidationComposite;
  validationStubs: Validation[];
}

const makeSut = (): SutTypes => {
  const validationStubs = [makeValidation(), makeValidation()];
  const sut = new ValidationComposite(validationStubs);

  return {
    sut,
    validationStubs,
  };
};

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', async () => {
    const { sut, validationStubs } = makeSut();
    const input = makeFakeObject();

    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error());
    const errorFirstValidation = sut.validate(input);
    expect(errorFirstValidation).toBeTruthy();

    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new Error());
    const errorLastValidation = sut.validate(input);
    expect(errorLastValidation).toBeTruthy();
  });

  test('Should return the first error if more the one validation fails', async () => {
    const { sut, validationStubs } = makeSut();
    const input = makeFakeObject();
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new InvalidParamError('any_param'));
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new MissingParamError('any_param'));

    const error = sut.validate(input);
    expect(error).toEqual(new InvalidParamError('any_param'));
  });

  test('Should return void if all validations succeeds', async () => {
    const { sut } = makeSut();
    const input = makeFakeObject();

    const error = sut.validate(input);
    expect(error).toBeFalsy();
  });
});
