import { Router } from 'express';
import rescue from 'express-rescue';

import ClubsController from '../Controllers/ClubsController';

const route = Router();

route.get('/:id', rescue(ClubsController.getById));

route.get('/', rescue(ClubsController.getAll));

export default route;
