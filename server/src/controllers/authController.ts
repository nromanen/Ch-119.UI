import sequelize from '../db/sequelize/models/index';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import ApiError from '../errors/ApiErrors';
// import { MobizonResponse, sendSMS } from '../services/notification';
import {
  generateAccessToken,
  generateRefreshToken,
  deleteToken,
  // saveToken
} from '../utils/jwtHelpers';
// import { generateVerifyCode } from '../services/verification';

const User = sequelize.models['users'];
const Role = sequelize.models['roles'];
const Op = sequelize.Sequelize.Op;

export default class authController {
  async registration(req: Request, res: Response, next: NextFunction) {
    // Save User to Database
    const { password, phone, verification_code } = req.body;
    console.log('Phone on server ----------------------',phone);
    

    if (!phone || !password) {
      return ApiError.badRequest('Incorrect password or phone');
    }

    const candidate = await sequelize.models['users'].findOne({
      where: { phone },
    });
    if (candidate) {
      return ApiError.conflict('User with this phone already exist');
    }
    // функціонал введення правильних цифр від сервісу
    // const verifyCode = generateVerifyCode()
    User.create({
      phone: req.body.phone,
      name: req.body.name,
      password: bcrypt.hashSync(req.body.password, 5),
      verification_code: 'null'
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
            const accessToken = generateAccessToken(user.id, user.name, roles.name);
            const refreshToken = generateRefreshToken(
              user.id,
              user.name,
              roles.name,
            );
            // const noteServiceRes: Promise<MobizonResponse> = sendSMS(
            //   phone,
            //   `Softtaxi: your verify code ${verifyCode}`
            // )
            // if ( verifyCode !== verification_code) {
            //   return res.status(401).json({
            //     message: 'You should verify your account',
            //     status: 'NOT_VERIFIED',
            //     verifyCode: noteServiceRes,
            //   })
            // } else {
            res.cookie('refreshToken', refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            // saveToken(user.id, refreshToken)
            return res.json({ accessToken, refreshToken });
          });
        });
      })
      .catch((err: Error) => {
        return ApiError.forbidden('Server error');
      });
  }

  async login(req: Request, res: Response, next: NextFunction) {
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
          return ApiError.unathorized('Invalid Data!');
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
          res.cookie('refreshToken', refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
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
        return ApiError.forbidden('Server error');
      });
  }

  async refresh(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { refreshToken } = req.body;

    const userInfo = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY!,
    );
      if (!refreshToken) {
        return ApiError.forbidden('Not authorized');
      }

    res.cookie('refreshToken', refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
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
    res.cookie('refreshToken', refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
    return res.json({ accessToken, refreshToken });
  }

  async delToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    const {refreshToken} = req.cookies;
    deleteToken(req.body, refreshToken);
    res.clearCookie('refreshToken');
    res.sendStatus(204);
  }
}
