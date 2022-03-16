import { Router } from 'express';
import rescue from 'express-rescue';
import validation from '../Schemas/implemetation';

import Login from '../Controllers/LoginController';

const route = Router();

route.post('/', rescue(validation.loginValidate), rescue(Login.Login));

export default route;
