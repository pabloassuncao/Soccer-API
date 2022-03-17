import { Router } from 'express';
import AuthController from '../Controllers/AuthController';
import LoginRoute from './LoginRoute';
import ValidateRoute from './ValidateRoute';

const route = Router();

// const authController = new AuthController().authenticator;

route.use('/login', LoginRoute);

route.use(AuthController.authenticator);

route.use('/login/validate', ValidateRoute);

export default route;
