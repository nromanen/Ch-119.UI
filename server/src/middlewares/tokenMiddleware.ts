import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { getToken, refreshTokens } from '../utils/jwtHelpers';
import ApiError from '../errors/ApiErrors';
import { UNATHORIZED } from '../constants/errors';

export const authMiddleware = (req: any, res: Response, next: NextFunction) => {

  const token: string = getToken(req);

    if (!token) {
      return next(ApiError.conflict(UNATHORIZED));
    }
    try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY!);
    if (!decoded) {
      return next(ApiError.conflict(UNATHORIZED));
    }
    
    req.user = decoded;
    next();
  } catch (error) {
    return next(ApiError.conflict(UNATHORIZED));
  }
};

export const refreshTokenMiddleware = (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  const { refreshToken } = req.cookies;
  try {
    if (refreshToken == null) {
      return ApiError.internal();
    }
    if (!refreshTokens.includes(refreshToken)) {
      return ApiError.forbidden();
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY!,
    );
    req.user = decoded;
    next();
  } catch (error) {
    return ApiError.forbidden();
  }
};
