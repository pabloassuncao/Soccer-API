import { NextFunction, Request, Response } from 'express';
import { Err } from '../../utils';
import loginSchema from '../loginSchema';
import matchSchemas from '../matchSchema';

async function loginValidate(req: Request, _r: Response, next: NextFunction): Promise<void> {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    throw new Err('UNAUTHORIZED', error.details[0].message);
  }
  return next();
}

async function matchValidate(req: Request, _r: Response, next: NextFunction): Promise<void> {
  const { error } = matchSchemas.definitiveSchema.validate(req.body);
  if (error) {
    throw new Err('UNAUTHORIZED', error.details[0].message);
  }
  return next();
}

export default {
  loginValidate,
  matchValidate,
};
