import { readFileSync } from 'fs';

export enum MESSAGES {
  EMAIL_PASSWORD_EMPTY = 'All fields must be filled',
  EMAIL_PASSWORD_INVALID = 'Incorrect email or password',
  EMAIL_NOT_FOUND = 'Incorrect email or password',
  EMAIL_NOT_STRING = '"email" should be a string',
  EMAIL_EMPTY = '"email" is not allowed to be empty',
  PASSWORD_INVALID = '"password" length must be 6 characters long',
  PASSWORD_NOT_FOUND = '"password" is required',
  PASSWORD_NOT_STRING = '"password" should be a string',
  PASSWORD_EMPTY = '"password" is not allowed to be empty',
  USER_ALREADY_EXISTS = 'User already registered',
  USER_NOT_EXISTS = 'Invalid fields',
  USER_NOT_FOUND = 'User does not exist',
  CREDENTIALS_INVALID = 'Invalid credentials',
  TOKEN_NOT_FOUND = 'Token not found',
  TOKEN_INVALID = 'Expired or invalid token',
  CATEGORY_NAME_NOT_FOUND = '"name" is required',
  CATEGORY_ALREADY_EXISTS = 'User already registered',
  TITLE_NOT_STRING = '"title" should be a string',
  TITLE_NOT_FOUND = '"title" is required',
  CONTENT_NOT_STRING = '"content" should be a string',
  CONTENT_NOT_FOUND = '"content" is required',
  CATEGORY_IDS_NOT_FOUND = '"categoryIds" is required',
  CATEGORY_IDS_INVALID = '"categoryIds" not found',
  BLOG_POST_NOT_FOUND = 'Post does not exist',
  CATEGORY_IDS_NOT_ALLOWED = 'Categories cannot be edited',
  UNAUTHORIZED_USER = 'Unauthorized user',
}

export const JWT_SECRET = readFileSync(`${__dirname}/../jwt.evaluation.key`).toString();

export interface ErrList {
  readonly BAD_REQUEST: number,
  readonly UNAUTHORIZED: number,
  readonly NOT_FOUND: number,
  readonly CONFLICT: number,
  readonly UNPROCCESSABLE_ENTITY: number,
  readonly 'array.base': number,
  readonly 'array.min': number,
  readonly 'string.empty': number,
  readonly 'string.base': number,
  readonly 'string.min': number,
  readonly 'string.email': number,
  readonly 'any.required': number,
  readonly 'number.min': number,
  readonly 'number.base': number,
}

export class Err extends Error {
  code: keyof ErrList;

  message: string;

  constructor(code: keyof ErrList, message = '') {
    super();
    this.code = code;
    this.message = message;
  }
}

// HTTP response status codes
const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_OK_NO_CONTENT_STATUS = 204;
const HTTP_BAD_REQUEST_STATUS = 400;
const HTTP_UNAUTHORIZED_STATUS = 401;
const HTTP_NOT_FOUND_STATUS = 404;
const HTTP_CONFLICT_STATUS = 409;
const HTTP_UNPROCCESSABLE_ENTITY_STATUS = 422;
const HTTP_INTERNAL_SERVER_ERROR_STATUS = 500;

// Errors code
export const ERR_CODES: ErrList = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCCESSABLE_ENTITY: 422,
  'array.base': 422,
  'array.min': 422,
  'string.empty': 422,
  'string.base': 422,
  'string.min': 422,
  'string.email': 422,
  'any.required': 400,
  'number.min': 422,
  'number.base': 422,
};

// Routes
const USER_ROUTE = '/users';
const LOGIN_ROUTE = '/login';
const PRODUCT_ROUTE = '/products';
const ORDER_ROUTE = '/orders';

// Port
const PORT = '3000';

// Functions

// Export

export default {
  HTTP_OK_STATUS,
  HTTP_CREATED_STATUS,
  HTTP_OK_NO_CONTENT_STATUS,
  HTTP_BAD_REQUEST_STATUS,
  HTTP_UNAUTHORIZED_STATUS,
  HTTP_NOT_FOUND_STATUS,
  HTTP_CONFLICT_STATUS,
  HTTP_UNPROCCESSABLE_ENTITY_STATUS,
  HTTP_INTERNAL_SERVER_ERROR_STATUS,
  USER_ROUTE,
  LOGIN_ROUTE,
  PRODUCT_ROUTE,
  ORDER_ROUTE,
  PORT,
};
