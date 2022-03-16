import { Router } from 'express';
import loginRoute from './LoginRoute';

const route = Router();

route.use('/login', loginRoute);

route.get('/', (req, res) => {
  res.send('Hello World!');
});

export default route;
