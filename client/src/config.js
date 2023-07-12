export const API_URL =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000';

export const IMGS_URL =
  process.env.NODE_ENV === 'production'
    ? '/img/uploads/'
    : 'http://localhost:3000/img/uploads/';

export const AVATAR_URL =
  process.env.NODE_ENV === 'production'
    ? '/img/avatars/'
    : 'http://localhost:3000/img/avatars/';
