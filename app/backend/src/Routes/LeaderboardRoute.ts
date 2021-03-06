import { Router } from 'express';
import rescue from 'express-rescue';

import LeaderboardController from '../Controllers/LeaderboardController';

const route = Router();

route.get('/home', rescue(LeaderboardController.getLeaderboard));

route.get('/away', rescue(LeaderboardController.getLeaderboard));

route.get('/', rescue(LeaderboardController.getLeaderboard));

export default route;
