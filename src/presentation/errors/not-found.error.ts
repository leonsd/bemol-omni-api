export class NotFoundError extends Error {
  constructor(resourceName: string) {
    super(`${resourceName} not found`);
    this.name = 'NotFoundError';
  }
}
