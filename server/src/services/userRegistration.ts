import {
    USER,
    ROLE,
    DRIVER,
    USER_ROLE,
    DRIVER_ROLE,
  } from '../constants/modelsNames';
  import { Op } from 'sequelize';
import sequelize from '../db/sequelize/models/index';
import * as bcrypt from 'bcrypt';
import { generateVerifyCode } from './verification';
import ApiError from '../errors/ApiErrors';
import { MAX_AGE } from '../constants/api';
import {
    generateAccessToken,
    generateRefreshToken,
  } from '../utils/jwtHelpers';

  const User = sequelize.models[USER];
  const Role = sequelize.models[ROLE];
  const Driver = sequelize.models[DRIVER];

export const createUserInDb = (body: any) => {
    User.create({
    phone: body.phone,
    name: body.name,
    password: bcrypt.hashSync(body.password, 5),
    verification_code: generateVerifyCode(),
  })
    .then((user: any) => {
      const roles = body.roles ? body.roles : [USER_ROLE];
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
          return { accessToken, refreshToken };
        });
      });
    });
}