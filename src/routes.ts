import express from 'express';
import UserController from './controllers/UserController';
import profileToken from './middlewares/token';

const routes = express();

routes
  .post('/signup', UserController.signUp)
  .post('/login', UserController.logIn)
  .get('/profile', profileToken, UserController.profile);

export default routes;
