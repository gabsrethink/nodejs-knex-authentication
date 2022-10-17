import UserRepository from '../repositories/UserRepository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextFunction } from 'express';
import { CustomError } from '../middlewares/error';

export async function register(
  name: string,
  email: string,
  password: string,
  next: NextFunction,
) {
  try {
    return await UserRepository.register(name, email, password, next);
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
    } else {
      var token = jwt.sign(
        {
          email: user.email,
        },
        user.password,
      );
      return token;
    }
  } catch (error) {
    next(error);
    return false;
  }
}

export async function userProfile(email: string, next: NextFunction) {
  try {
    const user = await UserRepository.getUser(email, next);
    return user;
  } catch (error) {
    next(error);
    return false;
  }
}
