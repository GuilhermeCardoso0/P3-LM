import request from 'supertest';
import app from '../../src/app';

describe('Protected delete', () => {
  it('should prevent non-admin from deleting', async () => {
    // create user (non-admin)
    await request(app).post('/auth/register').send({ name:'User1', email:'u1@example.com', password:'pw12345', role:'user' });
    const created = await request(app).post('/auth/register').send({ name:'User2', email:'u2@example.com', password:'pw12345', role:'user' });
    // login as user1
    const login = await request(app).post('/auth/login').send({ email:'u1@example.com', password:'pw12345' });
    const token = login.body.token;
    const users = await request(app).get('/users');
    const id = users.body[0].id;
    const res = await request(app).delete(`/users/${id}`).set('Authorization', 'Bearer ' + token);
    expect(res.status).toBe(403);
  });
});
