import { ROLES } from '../db/sequelize/models/role';
import sequelize from '../db/sequelize/models/index';
import { NextFunction, Request, Response } from 'express';

const User = sequelize.models['users'];

const checkDuplicatePhone = (req: Request, res: Response, next: NextFunction) => {
  // Phone
  User.findOne({
    where: {
      phone: req.body.phone
    }
  }).then((user: any) => {
    if (user) {
      res.status(400).send({
        message: "Failed! Phone is already in use!"
      });
      return;
    }

      next();
    });
  };

const checkRolesExisted = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
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