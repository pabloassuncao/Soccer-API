import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { MESSAGES, JWT_SECRET } from '../utils';

export default class AuthController {
  static async authenticator(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: MESSAGES.TOKEN_NOT_FOUND }).end();
    }
    if (!JWT_SECRET) {
      return res.status(500).json({ message: MESSAGES.TOKEN_INVALID }).end();
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      res.locals.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: MESSAGES.TOKEN_INVALID }).end();
    }
  }
}
