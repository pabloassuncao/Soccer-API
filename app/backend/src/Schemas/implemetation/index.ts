import { NextFunction, Request, Response } from 'express';
import { Err } from '../../utils';
import loginSchema from '../loginSchema';
import matchSchema from '../matchSchema';

async function loginValidate(req: Request, _r: Response, next: NextFunction): Promise<void> {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    throw new Err('UNAUTHORIZED', error.details[0].message);
  }
  return next();
}

async function matchValidate(req: Request, _r: Response, next: NextFunction): Promise<void> {
  const { error } = matchSchema.validate(req.body);
  if (error) {
    throw new Err('UNPROCCESSABLE_ENTITY', error.details[0].message);
  }
  return next();
}

export default {
  loginValidate,
  matchValidate,
};
