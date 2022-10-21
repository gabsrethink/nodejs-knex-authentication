import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/UserRepository';
import { CustomError } from './error';

const profileToken = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  let token = request.headers.authorization;
  token ? (token = token.split(' ')[1]) : '';
  if (!token) {
    throw new CustomError('Invalid token', 401);
  } else {
    try {
      const decoded: any = jwt.decode(token);
      const user = await UserRepository.getUser(decoded.email);
      jwt.verify(token, user.password);
      response.locals.email = user.email;
      next();
    } catch (error) {
      next(new CustomError('Invalid token', 401));
    }
  }
};

export default profileToken;
