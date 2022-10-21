import request from 'supertest';
import { app } from '../index';
import UserRepository from '../repositories/UserRepository';

describe('User routes', () => {
  test('/signup', async () => {
    jest.spyOn(UserRepository, 'register').mockResolvedValue([14]);
    const res = await request(app).post('/signup').send({
      name: 'Gabriel',
      email: 'gabriel@rethink.com',
      password: 'Gabriel1991!',
      confirmPassword: 'Gabriel1991!',
    });
    expect(res.status).toEqual(200);
  });
  test('/signup', async () => {
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
