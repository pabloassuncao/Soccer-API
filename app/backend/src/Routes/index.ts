import { Router } from 'express';
import LoginRoute from './LoginRoute';
import ClubsRoute from './ClubsRoute';
import MatchesRoute from './MatchesRoute';
import LeaderboardRoute from './LeaderboardRoute';

const route = Router();

route.use('/login', LoginRoute);

route.use('/leaderboard', LeaderboardRoute);

route.use('/clubs', ClubsRoute);

route.use('/matchs', MatchesRoute);

export default route;
