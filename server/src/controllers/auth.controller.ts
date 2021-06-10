import sequelize from "../db/sequelize/models/index";
import * as jwt from "jsonwebtoken";
import * as bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from "express";
import ApiError from "../errors/ApiErrors";
import {generateAccessToken, refreshToken, deleteToken} from '../utils/jwtHelpers';

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
        const roles = req.body.roles ? req.body.roles : ["user"]

        Role.findAll({
          where: {
            name: {
              [Op.or]: roles
            }
          }
        }).then((roles: any) => {
          user.setRoles(roles).then(() => {
            res.status(201);
          });
        });
      })
    .catch((err: Error) => {
      res.status(500).send({ message: err.message });
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
        return res.status(401).send({
          message: "Invalid Data!"
        });
      }

      const authorities: Array<string> = [];
      user.getRoles().then((roles: any) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        const refToken = refreshToken(user.id, user.name, user.phone, authorities)
        res.status(200).send({
          id: user.id,
          name: user.name,
          phone: user.phone,
          roles: authorities,
          accessToken: generateAccessToken(user.id, user.name, user.phone, authorities),
          refreshToken: refToken
        });
      });
    })
    .catch((err: Error) => {
      res.status(500).send({ message: err.message });
    });
};

export const refresh = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
  const {refreshToken} = req.body;
  
  const userInfo = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY!)

  return res.json({accessToken: generateAccessToken((userInfo as any).id,(userInfo as any).name, (userInfo as any).phone, (userInfo as any).roles)})
}

export const check = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
  const accessToken = generateAccessToken((req as any).id, (req as any).phone, (req as any).name, (req as any).roles)
  return res.json({accessToken})
}

export const delToken = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
  deleteToken(req.body)
  res.sendStatus(204)
}