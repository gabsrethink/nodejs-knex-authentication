import knex from '../database/index';
import bcrypt from 'bcrypt';
import { NextFunction } from 'express';
import { CustomError } from '../middlewares/error';

export async function register(
  name: string,
  email: string,
  password: string,
  next: NextFunction,
) {
  try {
    password = await bcrypt.hash(password, 8);
    const results = await knex('users').insert({ name, email, password });
    return results;
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      next(new CustomError('Email provided already exists', 409));
    }
  }
}

export async function getUser(email: string, next: NextFunction) {
  try {
    const user = await knex('users').first('*').where({ email });
    if (!user) {
      throw new CustomError('User not found!', 401);
    }
    return user;
  } catch (error) {
    next(error);
  }
}

export default { register, getUser };
