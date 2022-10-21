import UserRepository from '../repositories/UserRepository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextFunction } from 'express';
import { CustomError } from '../middlewares/error';

export async function register(name: string, email: string, password: string) {
  try {
    return await UserRepository.register(name, email, password);
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      throw new CustomError('Email provided already exists', 409);
    }
    throw error;
  }
}

export async function login(email: string, password: string) {
  try {
    const user = await UserRepository.getUser(email);
    if (!user) {
      throw new CustomError('User not found!', 401);
    }
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
    throw error;
  }
}

export async function userProfile(email: string, next: NextFunction) {
  try {
    const user = await UserRepository.getUser(email);
    return user;
  } catch (error) {
    next(error);
    return false;
  }
}
