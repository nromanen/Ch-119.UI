import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import sequelize from '../db/sequelize/models/index';
import ApiError from '../errors/ApiErrors';

const User = sequelize.models['users'];

export const checkRoleMiddleware = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
      next();
    }

    try {
      const token: string = req.headers.authorization!.split(' ')[1];

      if (!token) {
        return next(ApiError.internal());
      }

      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY!);

      User.findByPk((decoded as any).id).then((user: any) => {
        user.getRoles().then((roles: any) => {
          if (roles[0].name === role) {
            next();
            return;
          }
          next(ApiError.internal());
          return;
        });
      });
    } catch (error) {
      return next(ApiError.internal());
    }
  };
};
