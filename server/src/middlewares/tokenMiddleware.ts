import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { refreshTokens } from '../utils/jwtHelpers';
import ApiError from '../errors/ApiErrors';

export const authMiddleware = (req: any, res: Response, next: NextFunction) => {

  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    const token: string = req.headers.authorization!.split(' ')[1]

    if (!token) {
      return next(ApiError.internal());
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY!)
    if (!decoded) {
      return next(ApiError.internal());
    }

    req.user = decoded
    next()
  } catch (error) {
    return next(ApiError.internal());
  }
}

export const refreshTokenMiddleware = (req: any, res: Response, next: NextFunction) => {

  const {refreshToken} = req.cookies
  try {
    if (refreshToken == null) {
      return ApiError.internal()
    }
    if (!refreshTokens.includes(refreshToken)) {
      return ApiError.forbidden()
    }
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY!)
    req.user = decoded   
      next() 
    }  catch (error) {
      return ApiError.forbidden()
    }
  }
