import { GenericObject, Validation } from '../../protocols/validation.protocol';

export class ValidationComposite implements Validation {
  constructor(private readonly validations: Validation[]) {}

  validate(input: GenericObject): void | Error {
    for (const validation of this.validations) {
      const error = validation.validate(input);
      if (error) return error;
    }
  }
}
