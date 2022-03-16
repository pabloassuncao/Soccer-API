import express, { NextFunction, Request, Response, Express } from 'express';
import routes from './Routes';
import utils, { Err, ERR_CODES } from './utils';

class App {
  public app: Express;
  // ...

  constructor() {
    // ...
    this.app = express();
    this.config();
    // ...
  }

  private config():void {
    const accessControl: express
      .RequestHandler = (_req: Request, res: Response, next: NextFunction) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
        res.header('Access-Control-Allow-Headers', '*');
        next();
      };

    this.app.use(accessControl);
    // ...
  }

  // ...
  public start(PORT: string | number):void {
    // ...
    this.app.listen(PORT);
    this.app.use(express.json());
    this.app.use('/', routes);

    this.app.use('/', (err: Err, __req: Request, res: Response, __next: NextFunction) => {
      const status = ERR_CODES[err.code];
      console.log(status, err);

      if (status) {
        return res.status(+status).json({ message: err.message }).end();
      }
      return res
        .status(utils.HTTP_INTERNAL_SERVER_ERROR_STATUS)
        .json({ message: 'Internal server error' }).end();
    });
    console.log(`Server running on port ${PORT}`);
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
