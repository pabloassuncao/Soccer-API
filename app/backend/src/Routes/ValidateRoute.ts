import { Router } from 'express';
import rescue from 'express-rescue';

import Login from '../Controllers/LoginController';

const route = Router();

route.get('/', rescue(Login.Validate));

export default route;
