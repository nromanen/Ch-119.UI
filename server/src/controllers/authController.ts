import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { Op } from 'sequelize';
import sequelize from '../db/sequelize/models/index';
import ApiError from '../errors/ApiErrors';
import {
  generateAccessToken,
  generateRefreshToken,
  deleteToken,
} from '../utils/jwtHelpers';
import { generateVerifyCode } from '../services/verification';
import {
  USER,
  ROLE,
  DRIVER,
  USER_ROLE,
  DRIVER_ROLE,
} from '../constants/modelsNames';
import { MAX_AGE } from '../constants/api';
import { CAR_NUMBER_EXIST } from '../constants/errors';

const User = sequelize.models[USER];
const Role = sequelize.models[ROLE];
const Driver = sequelize.models[DRIVER];

export default class AuthController {
  async registration(req: Request, res: Response, next: NextFunction) {
    const { password, phone, verification_code,
      car_model, car_color, car_number } = req.body;

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
      User.create({
        phone: req.body.phone,
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, 5),
        verification_code: generateVerifyCode(),
      })
        .then((user: any) => {
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
              
              Driver.create({
                user_id: user.id,
                car_color: req.body.car_color,
                car_model: req.body.car_model,
                car_number: req.body.car_number,
              });
              const driver_info = {
                car_color,
                car_model,
                car_number,
              };

              const accessToken = generateAccessToken(
                user.id,
                user.name,
                user.phone,
                authorities,
                driver_info,
              );
              const refreshToken = generateRefreshToken(
                user.id,
                user.name,
                user.phone,
                authorities,
                driver_info,
              );
              res.cookie('refreshToken', refreshToken, {
                maxAge: MAX_AGE,
                httpOnly: true,
              });
              return res.json({ accessToken, refreshToken });
            });
          });
        })} catch {
          return next(ApiError.forbidden());
        };
    } else {
      try {
      User.create({
        phone: req.body.phone,
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, 5),
        verification_code: generateVerifyCode(),
      })
        .then((user: any) => {
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

              // replace authorization 
              const accessToken = generateAccessToken(
                user.id,
                user.name,
                user.phone,
                authorities,
              );
              const refreshToken = generateRefreshToken(
                user.id,
                user.name,
                user.phone,
                authorities,
              );
              res.cookie('refreshToken', refreshToken, {
                maxAge: MAX_AGE,
                httpOnly: true,
              });
              return res.json({ accessToken, refreshToken });
            });
          });
        })} catch {
          return next(ApiError.forbidden());
        };
    }} catch {
      return next(ApiError.forbidden());
    }
  }

  async login (req: Request, res: Response, next: NextFunction) {
    try {
      let driverInfo: any = null;
    await User.findOne({
      where: {
        phone: req.body.phone,
      },
    })
      .then((user: any) => {
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

        // check verification code if null do the same if not null send message for verification
        // use other method for send res with message

        Driver.findOne({
          where: {
            user_id: user.id,
          },
        }) 
        .then((driver: any) => {
          if (!driver) {
            driverInfo = null
          } else {
          driverInfo = driver.dataValues;
          }
        })
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
            driverInfo
          );
          res.cookie('refreshToken', refreshToken, {
            maxAge: MAX_AGE,
            httpOnly: true,
          });
          res.status(200).send({
            id: user.id,
            name: user.name,
            phone: user.phone,
            roles: authorities,
            driverInfo,
            accessToken: generateAccessToken(user.id, user.name, user.phone, authorities,  driverInfo),
            refreshToken,
          });
        });
      })} catch {
        return next(ApiError.forbidden());
      };
  }

  async refresh(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { refreshToken } = req.cookies;

    const userInfo = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY!,
    );
    if (!refreshToken) {
      return next(ApiError.forbidden());
    }

    res.cookie('refreshToken', refreshToken, {
      maxAge: MAX_AGE,
      httpOnly: true,
    });

    return res.json({
      accessToken: generateAccessToken(
        (userInfo as any).id,
        (userInfo as any).name,
        (userInfo as any).phone,
        (userInfo as any).roles,
        (userInfo as any).driver_info,
      ),
      refreshToken: generateRefreshToken(
        (userInfo as any).id,
        (userInfo as any).name,
        (userInfo as any).phone,
        (userInfo as any).roles,
        (userInfo as any).driver_info,
      ),
    });
  }

  async check(req: Request, res: Response, next: NextFunction): Promise<any> {
    const token: string = req.headers.authorization!.split(' ')[1];

    const userInfo = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY!);

    const accessToken = generateAccessToken(
      (userInfo as any).id,
      (userInfo as any).name,
      (userInfo as any).phone,
      (userInfo as any).roles,
    );
    const refreshToken = generateRefreshToken(
      (userInfo as any).id,
      (userInfo as any).name,
      (userInfo as any).phone,
      (userInfo as any).roles,
    );
    res.cookie('refreshToken', refreshToken, {
      maxAge: MAX_AGE,
      httpOnly: true,
    });
    return res.json({ accessToken, refreshToken });
  }

  async delToken(req: Request, res: Response): Promise<any> {
    const { refreshToken } = req.cookies;
    deleteToken(req.body, refreshToken);
    res.clearCookie('refreshToken');
    res.sendStatus(204);
  }
}
