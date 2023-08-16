import { makeAddAccountValidator } from './account-validation.factory';
import { ValidationComposite } from '../../../presentation/helpers/validations/validation-composite';
import { Validation } from '../../../presentation/protocols/validation.protocol';
import { RequiredFieldsValidation } from '../../../presentation/helpers/validations/required-fields/required-fields.validation';

jest.mock('../../../presentation/helpers/validations/validation-composite');

describe('AddAccountValidations Factory', () => {
  test('Should call ValidationComposite with all validations', async () => {
    const validations: Validation[] = [];
    const requiredFields = ['username', 'gender', 'email', 'password'];
    for (const field of requiredFields) {
      const requiredFieldValidation = new RequiredFieldsValidation(field);
      validations.push(requiredFieldValidation);
    }

    makeAddAccountValidator();
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
