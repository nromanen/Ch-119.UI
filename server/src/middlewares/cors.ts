import { RequestHandler } from 'express';
import { FRONTEND_BASE_URL } from '../constants/api';

export const corsMiddleware: RequestHandler = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', FRONTEND_BASE_URL);

  res.header(
    'Access-Control-Allow-Methods',
    'PUT, GET, POST, PATCH, DELETE, OPTIONS',
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );

  next();
};
