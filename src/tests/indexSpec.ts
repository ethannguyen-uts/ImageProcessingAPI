import supertest from 'supertest';
import app from '../index';

const request = supertest(app);
describe('1. Testing endpoint response', () => {
  it('get the images api endpoint, expect sucess', async () => {
    const response = await request.get(
      '/api/images?fileName=fjord&width=100&height=100'
    );
    expect(response.status).toBe(200);
  });
  it('get the images api endpoint widthout parameters, expect 400 response error', async () => {
    const response = await request.get('/api/images');
    expect(response.status).toBe(400);
  });
});
