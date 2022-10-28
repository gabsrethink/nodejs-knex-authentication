import request from 'supertest';
import { app } from '../index';
import UserRepository from '../repositories/UserRepository';
import { login } from '../services/user.service';

describe('User routes', () => {
  test('/signup', async () => {
    jest.spyOn(UserRepository, 'register').mockResolvedValue([24]);
    const res = await request(app).post('/signup').send({
      name: 'Gabriel',
      email: 'gabriel@rethink.com',
      password: 'Gabriel1991!',
      confirmPassword: 'Gabriel1991!',
    });
    expect(res.status).toEqual(200);
  });
  test('/signup same e-mail error', async () => {
    jest
      .spyOn(UserRepository, 'register')
      .mockRejectedValue({ code: 'ER_DUP_ENTRY' });
    const res = await request(app).post('/signup').send({
      name: 'Gabriel',
      email: 'gabriel@rethink.com',
      password: 'Gabriel1991!',
      confirmPassword: 'Gabriel1991!',
    });
    expect(res.status).toEqual(409);
  });
});

describe('Service functions', () => {
  test('200 - successful login ', async () => {
    jest.spyOn(UserRepository, 'getUser').mockResolvedValue({
      id: 1,
      name: 'Gabriel Melo',
      email: 'gabriel.melo@rethink.dev',
      password: '$2b$08$3jEG0ZUfd0j/E3K/vkHy5u/mVMWPnTV98zt7fMVy.XOjiiGSHw6Qa',
    });
    const user = {
      email: 'gabriel.melo@rethink.dev',
      password: 'batata',
    };
    const res = await login(user.email, user.password);
    expect(res).toContain('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
  });
});
