import { Router } from 'express';
import rescue from 'express-rescue';
import validation from '../Schemas/implemetation';

import Login from '../Controllers/LoginController';
import AuthController from '../Controllers/AuthController';

const route = Router();

route.post('/', rescue(validation.loginValidate), rescue(Login.Login));
route.get('/validate', rescue(AuthController.authenticator), rescue(Login.Validate));

export default route;
