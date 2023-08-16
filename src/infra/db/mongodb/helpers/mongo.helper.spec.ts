import { MongoHelper as sut } from './mongo.helper';

const makeFakeMongooseEntity = (): any => {
  return {
    _id: 'any_id',
    property: 'any_value',
    toJSON() {
      return this;
    },
  };
};

describe('Mongo Helper', () => {
  test('Should return null if entity is null', async () => {
    const response = sut.map(null);
    expect(response).toBeNull();
  });

  test('Should return property _id mapped to id', async () => {
    const response = sut.map(makeFakeMongooseEntity());

    expect(response).toBeTruthy();
    expect(response?.id).toBeTruthy();
    expect(response?.id).toBe('any_id');
    expect(response?.property).toBe('any_value');
  });
});
