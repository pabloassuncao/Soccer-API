import { Request, Response } from 'express';
import LoginService from '../Services/LoginService';

export default class LoginController {
  static async Login(req: Request, res: Response) {
    const data = req.body;
    const result = await LoginService.Login(data);
    return res.status(200).json(result).end();
  }

  static async Validate(__req: Request, res: Response) {
    const data = res.locals.user;
    const result = await LoginService.Validate(data.result);
    return res.status(200).send(result).end();
  }
}
