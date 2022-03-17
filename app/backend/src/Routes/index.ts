import { Router } from 'express';
import LoginRoute from './LoginRoute';
import ClubsRoute from './ClubsRoute';

const route = Router();

route.use('/login', LoginRoute);

route.use('/clubs', ClubsRoute);

export default route;
