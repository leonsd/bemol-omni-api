import { RequiredFieldsValidation } from '../../../presentation/helpers/validations/required-fields/required-fields.validation';
import { ValidationComposite } from '../../../presentation/helpers/validations/validation-composite';
import { Validation } from '../../../presentation/protocols/validation.protocol';

export const makeAddAccountValidator = (): Validation => {
  const validations: Validation[] = [];
  const requiredFields = ['username', 'gender', 'email', 'password'];
  for (const field of requiredFields) {
    const requiredFieldValidation = new RequiredFieldsValidation(field);
    validations.push(requiredFieldValidation);
  }

  return new ValidationComposite(validations);
};
