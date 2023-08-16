import request from 'supertest';
import app from '../config/app.config';

describe('CORS Middleware', () => {
  test('Should return correct cors headers', async () => {
    app.get('/test_cors', (req, res) => {
      res.send();
    });
    await request(app)
      .get('/test_cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*');
  });
});
