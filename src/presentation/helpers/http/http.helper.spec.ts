import * as sut from './http.helper';

describe('Http Helper', () => {
  test('Should return 200 and any body', async () => {
    const httpResponse = sut.ok({});

    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toBeTruthy();
  });

  test('Should return 201 and any body', async () => {
    const httpResponse = sut.created({});

    expect(httpResponse.statusCode).toBe(201);
    expect(httpResponse.body).toBeTruthy();
  });

  test('Should return 400 and any body', async () => {
    const httpResponse = sut.badRequest(new Error());

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toBeTruthy();
  });

  test('Should return 404 and any body', async () => {
    const httpResponse = sut.notFound(new Error());

    expect(httpResponse.statusCode).toBe(404);
    expect(httpResponse.body).toBeTruthy();
  });

  test('Should return 500 and any body', async () => {
    const httpResponse = sut.serverError();

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toBeTruthy();
  });
});
