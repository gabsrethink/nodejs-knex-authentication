import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../middlewares/errorHandlerMiddleware';
import { register, login } from '../services/user.service';

const signUp = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, password, confirmPassword } = request.body;
    if (password !== confirmPassword) {
      throw new CustomError('Passwords must be the same!', 400);
    }
    await register(name, email, password);
    response.status(200).send('Registered successfully!');
  } catch (error) {
    next(error);
  }
};

const logIn = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = request.body;
    const validLogin = await login(email, password, next);
    if (validLogin) {
      response.status(200).send('Logged in successfully!');
    }
  } catch (error) {
    next(error);
  }
};

export default { signUp, logIn };
