import UserRepository from '../repositories/UserRepository';
import bcrypt from 'bcrypt';
import { NextFunction } from 'express';
import { CustomError } from '../middlewares/errorHandlerMiddleware';

export async function register(name: string, email: string, password: string) {
  try {
    return await UserRepository.register(name, email, password);
  } catch (error) {
    console.log(error);
  }
}

export async function login(
  email: string,
  password: string,
  next: NextFunction,
) {
  try {
    const user = await UserRepository.getUser(email, next);
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      throw new CustomError('Invalid password!', 401);
    }
    return true;
  } catch (error) {
    next(error);
    return false;
  }
}
