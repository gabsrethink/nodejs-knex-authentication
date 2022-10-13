import express from 'express';
import UserController from './controllers/UserController';

const routes = express();

routes
  .post('/signup', UserController.signUp)
  .post('/login', UserController.logIn);

export default routes;
