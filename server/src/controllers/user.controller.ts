// import { NextFunction, Request, Response } from 'express';
// import * as bcrypt from 'bcrypt';
// import {
//   generateAccessToken,
//   refreshToken,
//   deleteToken,
// } from '../utils/jwtHelpers';
// import ApiError from '../errors/ApiErrors';
// import sequelize from '../db/sequelize/models/index';

// export default class UserController {
//   registration = async (req: Request, res: Response): Promise<any> => {
//     const { name, password, phone } = req.body;

//     if (!phone || !password) {
//       return ApiError.badRequest('Incorrect password or phone');
//     }
//     const candidate = await sequelize.models['users'].findOne({
//       where: { phone },
//     });
//     if (candidate) {
//       return ApiError.conflict('User with this phone already exist');
//     }

//     const hashPassword = await bcrypt.hash(password, 5);
//     // функціонал введення правильних цифр від сервісу
//     const user = await sequelize.models['users'].create({
//       phone,
//       name,
//       password: hashPassword,
//     });
//     const token = generateAccessToken(user.id, user.phone, user.name);
// Замість цього буде підтвердження на телефон
//     return res.json({ token });
//   };

//   login = async (
//     req: Request,
//     res: Response,
//     next: NextFunction,
//   ): Promise<any> => {
//     const { phone, password } = req.body;
//     const user = await sequelize.models['users'].findOne({ where: { phone } });
//     if (!user) {
//       return next(ApiError.badRequest('User with this phone not found'));
//     }

//     let comparePassword = bcrypt.compareSync(password, user.password);
//     if (!comparePassword) {
//       return next(ApiError.badRequest('Incorrect password'));
//     }
//     const token = generateAccessToken(user.id, user.phone, user.name);
//     const newToken = refreshToken(user.id, user.phone, user.name);
//     return res.json({ token, newToken });
//   };

//   check = async (
//     req: Request,
//     res: Response,
//     next: NextFunction,
//   ): Promise<any> => {
//     const token = generateAccessToken(
//       (req as any).user.id,
//       (req as any).user.phone,
//       (req as any).user.name,
//     );
//     return res.json({ token });
//   };

//   refresh = async (
//     req: Request,
//     res: Response,
//     next: NextFunction,
//   ): Promise<any> => {
//     const accessToken = generateAccessToken(
//       (req as any).user.id,
//       (req as any).user.phone,
//       (req as any).user.name,
//     );
//     return res.json({ accessToken: accessToken });
//   };

//   delete = async (
//     req: Request,
//     res: Response,
//     next: NextFunction,
//   ): Promise<any> => {
//     deleteToken(req.body);
//     res.sendStatus(204);
//   };
// }
