import { Router } from 'express';
import rescue from 'express-rescue';

import MatchesController from '../Controllers/MatchesController';

const route = Router();

route.get('/:id', rescue(MatchesController.getById));
route.get('/', rescue(MatchesController.getAll));

export default route;
