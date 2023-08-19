import request from 'supertest';
import app from '../../config/app.config';
import { env } from '../../config/env.config';
import { MongoHelper } from '../../../infra/db/mongodb/helpers/mongo.helper';
import { AccountEntity } from '../../../infra/db/mongodb/entities/account.entity';

describe('Account Router', () => {
  beforeAll(async () => {
    const uri = env.mongoUrl;
    await MongoHelper.connect(uri);
  });

  beforeEach(async () => {
    await AccountEntity.deleteMany({});
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  test('Should return 400 if username is no provided', async () => {
    const body = {
      email: 'any_email',
      gender: 'any_gender',
      password: 'any_password',
    };
    const response = await request(app).post('/accounts').send(body);
    expect(response.status).toBe(400);
  });

  test('Should return 400 if gender is no provided', async () => {
    const body = {
      username: 'any_username',
      email: 'any_email',
      password: 'any_password',
    };
    const response = await request(app).post('/accounts').send(body);
    expect(response.status).toBe(400);
  });

  test('Should return 400 if email is no provided', async () => {
    const body = {
      username: 'any_username',
      gender: 'any_gender',
      password: 'any_password',
    };
    const response = await request(app).post('/accounts').send(body);
    expect(response.status).toBe(400);
  });

  test('Should return 400 if password is no provided', async () => {
    const body = {
      username: 'any_username',
      gender: 'any_gender',
      email: 'any_email',
    };
    const response = await request(app).post('/accounts').send(body);
    expect(response.status).toBe(400);
  });

  test('Should return 400 if invalid password is provided', async () => {
    const body = {
      username: 'any_username',
      email: 'any_email',
      password: 'any_password',
    };
    const response = await request(app).post('/accounts').send(body);
    expect(response.status).toBe(400);
  });

  test('Should return an account on success', async () => {
    const body = {
      username: 'any_username',
      gender: 'any_gender',
      email: 'any_email',
      password: 'any_password',
      address: {
        zipCode: '01001-000',
        street: 'valid_street',
        number: 'valid_number',
        complement: 'valid_complement',
        neighborhood: 'valid_neighborhood',
        city: 'valid_city',
        state: 'valid_state',
      },
    };

    const response = await request(app).post('/accounts').send(body);
    expect(response.status).toBe(201);
    expect(response.body).toBeTruthy();
  });
});
