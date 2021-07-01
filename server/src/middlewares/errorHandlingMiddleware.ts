import { NextFunction, Request, Response } from 'express';
import ApiError from '../errors/ApiErrors';
import { UNEXPECTED_ERROR } from '../constants/errors';

export default (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ApiError) {
    res.status(parseInt(err.name, 10)).json({ message: err.message });
  }
  return next(res.status(500).json({ message: UNEXPECTED_ERROR }));
};
