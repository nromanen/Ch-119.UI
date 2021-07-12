import sequelize from '../db/sequelize/models/index';
import * as bcrypt from 'bcrypt';
import {
    USER, DRIVER
  } from '../constants/modelsNames';

const User = sequelize.models[USER];
const Driver = sequelize.models[DRIVER];
export const createUser = (phone: string, name: string, password: string, verification_code: number) => {
    const user =  User.create({
        phone: phone,
        name: name,
        password: bcrypt.hashSync(password, 5),
        verification_code: verification_code,
      })
      return user;
}

export const createDriver = (user_id: string, car_color: string, car_model: string, car_number: number) => {
    const driver =  Driver.create({
        user_id,
        car_color,
        car_model,
        car_number,
      })
      return driver;
}