import * as bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { Op } from 'sequelize';
import sequelize from '../db/sequelize/models/index';
import ApiError from '../errors/ApiErrors';
import { generateAccessToken, generateRefreshToken } from '../utils/jwtHelpers';
import { generateVerifyCode } from '../services/verification';
import { sendSMS } from '../services/notification';
import {
  USER,
  ROLE,
  DRIVER,
  USER_ROLE,
  DRIVER_ROLE,
} from '../constants/modelsNames';
import { MAX_AGE } from '../constants/api';
import {
  VERIFICATION_MESSAGE,
  VERIFICATED_IN_DB,
} from '../constants/verification';
import { createDriver, createUser } from '../services/dbRequestsIForAuth';
import { CAR_NUMBER_EXIST, VERIFY_ERROR } from '../constants/errors';

const User = sequelize.models[USER];
const Role = sequelize.models[ROLE];
const Driver = sequelize.models[DRIVER];

export default class AuthController {
  async registration(req: Request, res: Response, next: NextFunction) {
    const { password, phone, car_model, car_color, car_number } = req.body;

    const verifyCode = generateVerifyCode();
    if (!phone || !password) {
      return next(ApiError.badRequest());
    }
    try {
      if (car_number) {
        const driver = await Driver.findOne({
          where: { car_number },
        });
        if (driver) {
          return next(ApiError.conflict(CAR_NUMBER_EXIST));
        }
        try {
          const user: any = await createUser(
            req.body.phone,
            req.body.name,
            req.body.password,
            verifyCode,
          );
          const roles = req.body.roles
            ? req.body.roles
            : [USER_ROLE, DRIVER_ROLE];
          Role.findAll({
            where: {
              name: {
                [Op.or]: roles,
              },
            },
          }).then((roles: any) => {
            user.setRoles(roles).then(() => {
              const authorities: Array<string> = [];
              for (let i = 0; i < roles.length; i++) {
                authorities.push(roles[i].name);
              }
              createDriver(
                user.id,
                car_color,
                car_model,
                car_number.toUpperCase(),
              );
              // sendSMS(
              //   req.body.phone,
              //   VERIFICATION_MESSAGE(user.verification_code),
              // );
              next();
            });
          });
        } catch {
          return next(ApiError.forbidden());
        }
      } else {
        try {
          const user: any = await createUser(
            req.body.phone,
            req.body.name,
            req.body.password,
            verifyCode,
          );
          const roles = req.body.roles ? req.body.roles : [USER_ROLE];
          Role.findAll({
            where: {
              name: {
                [Op.or]: roles,
              },
            },
          }).then((roles: any) => {
            user.setRoles(roles).then(() => {
              const authorities: Array<string> = [];
              for (let i = 0; i < roles.length; i++) {
                authorities.push(roles[i].name);
              }
              // sendSMS(
              //   req.body.phone,
              //   VERIFICATION_MESSAGE(user.verification_code),
              // );
              next();
            });
          });
        } catch {
          return next(ApiError.forbidden());
        }
      }
    } catch {
      return next(ApiError.forbidden());
    }
  }

  async registerInProfile(req: Request, res: Response, next: NextFunction) {
    const { car_model, car_color, car_number, id } = req.body;
    try {
      const driver: any = await Driver.findOne({
        where: { car_number },
      });
      if (driver) {
        return next(ApiError.conflict(CAR_NUMBER_EXIST));
      } else {
        const user: any = await User.findOne({
          where: {
            id: id,
          },
        });
        const roles = req.body.roles
          ? req.body.roles
          : [USER_ROLE, DRIVER_ROLE];
        Role.findAll({
          where: {
            name: {
              [Op.or]: roles,
            },
          },
        }).then((roles: any) => {
          user.setRoles(roles).then(() => {
            const authorities: Array<string> = [];
            for (let i = 0; i < roles.length; i++) {
              authorities.push(roles[i].name);
            }
            createDriver(
              user.id,
              car_color,
              car_model,
              car_number.toUpperCase(),
            );
          });
        });
        res.status(200);
      }
    } catch {
      return next(ApiError.forbidden());
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user: any = await User.findOne({
        where: {
          phone: req.body.phone,
        },
      });
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

      if (user.verification_code !== VERIFICATED_IN_DB) {
        next(
          res
            .status(401)
            .send({ message: VERIFY_ERROR, code: user.verification_code }),
        );
      }
      next();
    } catch {
      return next(ApiError.forbidden());
    }
  }

  async authorization(req: Request, res: Response, next: NextFunction) {
    try {
      let driverInfo: any = null;
      const user: any = await User.findOne({
        where: {
          phone: req.body.phone,
        },
      });
      const driver: any = await Driver.findOne({
        where: {
          user_id: user.id,
        },
      });
      if (!driver) {
        driverInfo = null;
      } else {
        driverInfo = driver.dataValues;
      }
      const authorities: Array<string> = [];
      user.getRoles().then((roles: any) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push(roles[i].name);
        }
        const refreshToken = generateRefreshToken(
          user.id,
          user.name,
          user.phone,
          authorities,
          driverInfo,
        );
        const accessToken = generateAccessToken(
          user.id,
          user.name,
          user.phone,
          authorities,
          driverInfo,
        );
        res.cookie('refreshToken', refreshToken, {
          maxAge: MAX_AGE,
          httpOnly: true,
        });
        return res.json({ accessToken, refreshToken });
      });
    } catch {
      return next(ApiError.unathorized());
    }
  }

  async changeInfo(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, phone, car_number, id } = req.body;

      const user: any = await User.findOne({
        where: {
          id: id,
        },
      });
      if (phone) {
        user.phone = phone;
        await user.save();
      }
      if (name) {
        user.name = name;
        await user.save();
      }
      if (car_number) {
        const driverNumber = await Driver.findOne({
          where: {
            car_number: car_number,
            user_id: {
              [Op.not]: user.id,
            },
          },
        });
        if (!driverNumber) {
          const driver: any = await Driver.findOne({
            where: {
              user_id: user.id,
            },
          });
          driver.car_number = car_number;
          await driver.save();
        } else {
          return next(ApiError.conflict(CAR_NUMBER_EXIST));
        }
      }
      next();
    } catch {
      return next(ApiError.unathorized());
    }
  }
}
