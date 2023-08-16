export interface GenericObject {
  [key: string]: string;
}

export interface Validation {
  validate(input: GenericObject): void | Error;
}
