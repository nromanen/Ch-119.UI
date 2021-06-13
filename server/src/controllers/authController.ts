import sequelize from "../db/sequelize/models/index";
import * as jwt from "jsonwebtoken";
import * as bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from "express";
import ApiError from "../errors/ApiErrors";
import { MobizonResponse, sendSMS } from '../services/notification'
import { generateAccessToken, generateRefreshToken, deleteToken } from '../utils/jwtHelpers';

const User = sequelize.models['users'];
const Role = sequelize.models['roles'];
const Op = sequelize.Sequelize.Op;


export const signup = async (req: Request, res: Response, next: NextFunction) => {
  // Save User to Database
  const {password, phone} = req.body;

  if(!phone || !password) {              
      return ApiError.badRequest('Incorrect password or phone');  
  }

  const candidate = await sequelize.models['users'].findOne({where: {phone}})
      if(candidate) {
          return ApiError.conflict('User with this phone already exist');  
      }
// функціонал введення правильних цифр від сервісу 
  User.create({
    phone: req.body.phone,
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, 5)
  })
    .then((user: any )=> {
        const roles = req.body.roles ? req.body.roles : ["USER"]

        Role.findAll({
          where: {
            name: {
              [Op.or]: roles
            }
          }
        }).then((roles: any) => {
          user.setRoles(roles).then(() => {
            res.status(201).send({message: "User successfully create!"});
          });
        });
      })
    .catch((err: Error) => {
      return ApiError.forbidden('Server error')
    });
};

export const signin = async (req: Request, res: Response, next: NextFunction) => {
  await User.findOne({
    where: {
      phone: req.body.phone
    }
  })
    .then((user: any) => {
      if (!user) {
        return next(ApiError.badRequest('Invalid Data!'))
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return ApiError.unathorized('Invalid Data!')
      }

      const authorities: Array<string> = [];
      user.getRoles().then((roles: any) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push(roles[i].name);
        }
        const refreshToken = generateRefreshToken(user.id, user.name, authorities)
        res.status(200).send({
          id: user.id,
          name: user.name,
          phone: user.phone,
          roles: authorities,
          accessToken: generateAccessToken(user.id, user.name, authorities),
          refreshToken: refreshToken
        });
      });
    })
    .catch((err: Error) => {
      return ApiError.forbidden('Server error')
    });
};

export const refresh = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
  const {refreshToken} = req.body;
  
  const userInfo = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY!)

  return res.json({
    accessToken: generateAccessToken((userInfo as any).id,(userInfo as any).name, (userInfo as any).roles),
    refreshToken: generateRefreshToken((userInfo as any).id,(userInfo as any).name, (userInfo as any).roles)
  })
}

export const check = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
  const token: string = req.headers.authorization!.split(' ')[1];

  const userInfo = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY!)

  const accessToken = generateAccessToken((userInfo as any).id, (userInfo as any).name, (userInfo as any).roles)
  const refreshToken = generateRefreshToken((userInfo as any).id,(userInfo as any).name, (userInfo as any).roles)

  return res.json({accessToken, refreshToken})
}

export const delToken = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
  deleteToken(req.body)
  res.sendStatus(204)
}