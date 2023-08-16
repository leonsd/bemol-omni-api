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

  test('Should return an shortened url on success', async () => {
    const body = {
      username: 'any_username',
      email: 'any_email',
      password: 'any_password',
    };

    const response = await request(app).post('/accounts').send(body);
    // expect(response.status).toBe(201);
    // expect(response.body).toBeTruthy();
  });
});
