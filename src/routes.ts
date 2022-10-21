import express from 'express';
import UserController from './controllers/UserController';
import profileToken from './middlewares/token';
import { validate } from './middlewares/validation';

const routes = express();

routes
  .post('/signup', validate, UserController.signUp)
  .post('/login', UserController.logIn)
  .get('/profile', profileToken, UserController.profile);

export default routes;
