import { Request, Response } from 'express';
import { register, login } from '../services/user.service';

const signUp = async (request: Request, response: Response) => {
  try {
    const { name, email, password } = request.body;
    await register(name, email, password);
    response.status(200).send('Registered successfully!');
  } catch (error) {
    console.log(error);
  }
};

const logIn = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;
    await login(email, password);
    response.status(200).send('Logged in successfully!');
  } catch (error) {
    console.log(error);
  }
};

export default { signUp, logIn };
