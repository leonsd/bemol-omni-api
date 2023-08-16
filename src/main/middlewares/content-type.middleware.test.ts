import request from 'supertest';
import app from '../config/app.config';

describe('CORS Middleware', () => {
  test('Should return content-type as json', async () => {
    app.get('/test/content_type_json', (req, res) => {
      res.send('');
    });
    await request(app)
      .get('/test/content_type_json')
      .expect('Content-Type', /json/);
  });

  test('Should return content-type as xml', async () => {
    app.get('/test/content_type_xml', (req, res) => {
      res.type('xml');
      res.send('');
    });
    await request(app)
      .get('/test/content_type_xml')
      .expect('Content-Type', /xml/);
  });
});
