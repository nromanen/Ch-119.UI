import { NextFunction, Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import sequelize from '../db/sequelize/models/index';
import ApiError from '../errors/ApiErrors';
// import { MobizonResponse, sendSMS } from '../services/notification';
import {
  generateAccessToken,
  generateRefreshToken,
  deleteToken,
  // saveToken
} from '../utils/jwtHelpers';
import { generateVerifyCode } from '../services/verification';

// TODO CONSTANTS FOR MODELS
const User = sequelize.models['users'];
const Role = sequelize.models['roles'];
const Driver = sequelize.models['drivers'];
const { Op } = sequelize.Sequelize;

export default class AuthController {
  async registration(req: Request, res: Response, next: NextFunction) {
    const { password, phone, verification_code } = req.body;
    const { car_model, car_color, car_number } = req.body;

    if (!phone || !password) {
      return next(ApiError.badRequest('Incorrect password or phone'));
    }

    const candidate = await User.findOne({
      where: { phone },
    });
    if (candidate) {
      return next(ApiError.conflict('User with this phone already exist'));
    }

    if (!car_number) {
    // функціонал введення правильних цифр від сервісу
    // const verifyCode = generateVerifyCode()
    User.create({
      phone: req.body.phone,
      name: req.body.name,
      password: bcrypt.hashSync(req.body.password, 5),
      verification_code: generateVerifyCode(),
    })
      .then((user: any) => {
        const roles = req.body.roles ? req.body.roles : ['USER'];
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
            const accessToken = generateAccessToken(
              user.id,
              user.name,
              authorities,
            );
            const refreshToken = generateRefreshToken(
              user.id,
              user.name,
              authorities,
            );
            // const noteServiceRes: Promise<MobizonResponse> = sendSMS(
            //   phone,
            //   `Go Taxi: your verify code ${verifyCode}`
            // )
            // if ( verifyCode !== verification_code) {
            //   return res.status(401).json({
            //     message: 'You should verify your account',
            //     status: 'NOT_VERIFIED',
            //     verifyCode: noteServiceRes,
            //   })
            // } else {
            res.cookie('refreshToken', refreshToken, {
              maxAge: 30 * 24 * 60 * 60 * 1000,
              httpOnly: true,
            });
            // saveToken(user.id, refreshToken)
            return res.json({ accessToken, refreshToken });
          });
        });
      })
      .catch(() => {
        return next(ApiError.forbidden('Server error'));
      });
    } else {
      const driver = await Driver.findOne({
        where: { car_number },
      });
      if (driver) {
        return next(ApiError.conflict('Driver with this number already exist'));
      }
        User.create({
          phone: req.body.phone,
          name: req.body.name,
          password: bcrypt.hashSync(req.body.password, 5),
          verification_code: generateVerifyCode(),
        })
          .then((user: any) => {
            const roles = req.body.roles ? req.body.roles : ['USER', 'DRIVER'];
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
                })  
                const driver_info = {
                  car_color,
                  car_model,
                  car_number
                }

                const accessToken = generateAccessToken(
                  user.id,
                  user.name,
                  authorities,
                  driver_info,
                );
                const refreshToken = generateRefreshToken(
                  user.id,
                  user.name,
                  authorities,
                  driver_info,
                );
                res.cookie('refreshToken', refreshToken, {
                  maxAge: 30 * 24 * 60 * 60 * 1000,
                  httpOnly: true,
                });
                return res.json({ accessToken, refreshToken });
              });
            });
          })
          .catch(() => {
            return next(ApiError.forbidden('Server error'));
          });
    };
  };

  async login (req: Request, res: Response, next: NextFunction) {
    await User.findOne({
      where: {
        phone: req.body.phone,
      },
    })
      .then((user: any) => {
        if (!user) {
          return next(ApiError.badRequest('Invalid Data!'));
        }

        const passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password,
        );

        if (!passwordIsValid) {
          return next(ApiError.unathorized('Invalid Data!'));
        }

        const authorities: Array<string> = [];
        user.getRoles().then((roles: any) => {
          for (let i = 0; i < roles.length; i++) {
            authorities.push(roles[i].name);
          }
          const refreshToken = generateRefreshToken(
            user.id,
            user.name,
            authorities,
          );
          res.cookie('refreshToken', refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
          });
          res.status(200).send({
            id: user.id,
            name: user.name,
            phone: user.phone,
            roles: authorities,
            accessToken: generateAccessToken(user.id, user.name, authorities),
            refreshToken: refreshToken,
          });
        });
      })
      .catch((err: Error) => {
        return next(ApiError.forbidden('Server error'));
      });
  }

  async refresh(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { refreshToken } = req.cookies;

    const userInfo = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY!,
    );
    if (!refreshToken) {
      return next(ApiError.forbidden('Not authorized'));
    }

    res.cookie('refreshToken', refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json({
      accessToken: generateAccessToken(
        (userInfo as any).id,
        (userInfo as any).name,
        (userInfo as any).roles,
      ),
      refreshToken: generateRefreshToken(
        (userInfo as any).id,
        (userInfo as any).name,
        (userInfo as any).roles,
      ),
    });
  }

  async check(req: Request, res: Response, next: NextFunction): Promise<any> {
    const token: string = req.headers.authorization!.split(' ')[1];

    const userInfo = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY!);

    const accessToken = generateAccessToken(
      (userInfo as any).id,
      (userInfo as any).name,
      (userInfo as any).roles,
    );
    const refreshToken = generateRefreshToken(
      (userInfo as any).id,
      (userInfo as any).name,
      (userInfo as any).roles,
    );
    res.cookie('refreshToken', refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
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

  async getUsers(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    const users = await User.findAll().then((userslist: any) => {
      if (!userslist) {
        return next(ApiError.forbidden('Not authorized'));
      }
      return res.json(userslist);
    });
  }
}
