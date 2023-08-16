import { RequiredFieldsValidation } from './required-fields.validation';
import { Validation } from '../../../protocols/validation.protocol';
import { MissingParamError } from '../../../errors';

const makeFakeObject = () => {
  return {
    property: 'any_property',
  };
};

const makeSut = (): Validation => {
  return new RequiredFieldsValidation('property');
};

describe('RequiredFields Validator', () => {
  test('Should return MissingParamError if field is not provided', async () => {
    const sut = makeSut();
    const input = makeFakeObject();
    input.property = '';

    const error = sut.validate(input);
    expect(error).toEqual(new MissingParamError('property'));
  });

  test('Should return void if field provided', async () => {
    const sut = makeSut();
    const input = makeFakeObject();

    const error = sut.validate(input);
    expect(error).toBeFalsy();
  });
});
