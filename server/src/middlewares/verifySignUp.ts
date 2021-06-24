import { ROLES } from '../constants/modelsNames';
import sequelize from '../db/sequelize/models/index';
import { NextFunction, Request, Response } from 'express';
import ApiError from '../errors/ApiErrors';

const User = sequelize.models['users'];

const checkDuplicatePhone = (req: Request, res: Response, next: NextFunction) => {
  User.findOne({
    where: {
      phone: req.body.phone
    }
  }).then((user: any) => {
    if (user) {
      return next(ApiError.conflict());
    }
      next();
    });
  };

const checkRolesExisted = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send(ApiError.badRequest());
        return;
      }
    }
  }
  next();
};

const verifySignUp = {
    checkDuplicatePhone: checkDuplicatePhone,
  checkRolesExisted: checkRolesExisted
};

export default verifySignUp;