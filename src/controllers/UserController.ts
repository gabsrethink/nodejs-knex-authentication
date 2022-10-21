import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../middlewares/error';
import { validate } from '../middlewares/validation';
import { register, login, userProfile } from '../services/user.service';

const signUp = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, password, confirmPassword } = request.body;
    validate({ name, email, password }, next, response);
    if (password !== confirmPassword) {
      throw new CustomError('Passwords must be the same!', 400);
    }
    await register(name, email, password);
    response.status(200).send('User registered successfully');
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
    const loginToken = await login(email, password, next);
    if (loginToken) {
      response.status(200).send({ message: 'Success', token: loginToken });
    }
  } catch (error) {
    next(error);
  }
};

const profile = async (
  _request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const returnService = await userProfile(response.locals.email, next);
    return response
      .status(200)
      .send({ name: returnService.name, email: returnService.email });
  } catch (error) {
    next(error);
    return false;
  }
};

export default { signUp, logIn, profile };
