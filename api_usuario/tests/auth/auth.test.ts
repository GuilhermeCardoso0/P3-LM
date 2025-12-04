import request from 'supertest';
import app from '../../src/app';

describe('Auth', () => {
  it('should register and login', async () => {
    const reg = await request(app).post('/auth/register').send({ name:'Admin', email:'admin@example.com', password:'secret123', role:'admin' });
    expect(reg.status).toBe(201);
    const login = await request(app).post('/auth/login').send({ email:'admin@example.com', password:'secret123' });
    expect(login.status).toBe(200);
    expect(login.body).toHaveProperty('token');
  });
});
