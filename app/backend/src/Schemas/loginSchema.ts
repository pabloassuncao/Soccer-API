import Joi from 'joi';
import { MESSAGES } from '../utils';

const loginSchema = Joi.object().keys({
  email: Joi.string().required().email().messages({
    'string.base': MESSAGES.EMAIL_NOT_STRING,
    'string.email': MESSAGES.EMAIL_PASSWORD_INVALID,
    'string.empty': MESSAGES.EMAIL_PASSWORD_EMPTY,
    'any.required': MESSAGES.EMAIL_PASSWORD_EMPTY,
  }),
  password: Joi.string().min(6).required().messages({
    'string.base': MESSAGES.PASSWORD_NOT_STRING,
    'string.min': MESSAGES.EMAIL_PASSWORD_INVALID,
    'string.empty': MESSAGES.EMAIL_PASSWORD_EMPTY,
    'any.required': MESSAGES.EMAIL_PASSWORD_EMPTY,
  }),
});

export default loginSchema;
