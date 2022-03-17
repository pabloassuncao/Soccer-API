export const LOGIN_ROUTE = '/login';
export const LOGIN_VALIDATE_ROUTE = '/login/validate';

export const ADMIN_USER = {
  id: 1,
  username: "Admin",
  role: "admin",
  email: "admin@admin.com",
  password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW",
}

export const ClubsFindAllResponse = [
  {
    id: 1,
    clubName: 'Avaí/Kindermann',
  },
  {
    id: 2,
    clubName: 'Bahia',
  },
  {
    id: 3,
    clubName: 'Botafogo',
  },
  {
    id: 4,
    clubName: 'Corinthians',
  },
  {
    id: 5,
    clubName: 'Cruzeiro',
  },
  {
    id: 6,
    clubName: 'Palmeiras',
  },
  {
    id: 7,
    clubName: 'Flamengo',
  }
]

export const HTTP_OK_STATUS = 200;
export const HTTP_CREATED_STATUS = 201;
export const HTTP_OK_NO_CONTENT_STATUS = 204;
export const HTTP_BAD_REQUEST_STATUS = 400;
export const HTTP_UNAUTHORIZED_STATUS = 401;
export const HTTP_NOT_FOUND_STATUS = 404;
export const HTTP_CONFLICT_STATUS = 409;
export const HTTP_UNPROCCESSABLE_ENTITY_STATUS = 422;
export const HTTP_INTERNAL_SERVER_ERROR_STATUS = 500;