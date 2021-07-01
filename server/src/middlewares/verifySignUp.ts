import { ROLES } from '../constants/modelsNames';
import sequelize from '../db/sequelize/models/index';
import { NextFunction, Request, Response } from 'express';
import ApiError from '../errors/ApiErrors';
import { PHONE_NUMBER_EXIST } from '../constants/errors';
import * as bcrypt from 'bcrypt';

const User = sequelize.models['users'];

const checkDuplicatePhone = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  User.findOne({
    where: {
      phone: req.body.phone,
    },
  }).then((user: any) => {
    if (user) {
      return next(ApiError.conflict(PHONE_NUMBER_EXIST));
    }
    next();
  });
};

const checkVerifyCode = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  User.findOne({
    where: {
      phone: req.body.phone,
    },
  }).then( async (user: any) => {
    if (!user) {
      return next(ApiError.badRequest());
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password,
    );

    if (!passwordIsValid) {
      return next(ApiError.unathorized());
    }

    if (req.body.verification_code) {
      const checkEqualCode: boolean = user.verification_code === req.body.verification_code
       if (checkEqualCode) {
        user.verification_code = 'null';
         await user.save();
         next();
       }
    } else {
      next();
    }
  });
}

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
  checkDuplicatePhone,
  checkRolesExisted,
  checkVerifyCode,
};

export default verifySignUp;
