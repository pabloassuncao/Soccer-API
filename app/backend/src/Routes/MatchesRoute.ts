import { Router } from 'express';
import rescue from 'express-rescue';

import MatchesController from '../Controllers/MatchesController';
import Schemas from '../Schemas/implemetation';

const route = Router();

route.patch('/:id/finish', rescue(MatchesController.finishHim));
route.get('/:id', rescue(MatchesController.getById));
route.get('/', rescue(MatchesController.getAll));
route.post('/', rescue(Schemas.matchValidate), rescue(MatchesController.create));

export default route;
