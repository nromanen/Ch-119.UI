import * as express from 'express';
import {
  authMiddleware,
  refreshTokenMiddleware,
} from '../middlewares/tokenMiddleware';
import AuthController from '../controllers/authController';
import { checkRoleMiddleware } from '../middlewares/checkRoleMiddleware';
import verifySignUp from '../middlewares/verifySignUp';
import { USER_ROLE } from '../constants/modelsNames';

const router = express.Router();

const controller = new AuthController();

router.post(
  '/registration',
  verifySignUp.checkDuplicatePhone,
  controller.registration,
);
router.post('/login', controller.login);
router.get(
  '/auth',
  checkRoleMiddleware(USER_ROLE),
  authMiddleware,
  controller.check,
);
router.get('/token', refreshTokenMiddleware, controller.refresh);
router.delete('/logout', controller.delToken);

export default router;

// async registrationDriver(req: Request, res: Response, next: NextFunction) {
//   const { password, phone, verification_code,
//     car_model, car_color, car_number } = req.body;

//   if (!phone || !password) {
//     return next(ApiError.badRequest());
//   }
//   const candidate = await User.findOne({
//     where: { phone },
//   });
//   if (candidate) {
//     return next(ApiError.conflict());
//   }
  
//   try {
//   if (car_number) {
//     const driver = await Driver.findOne({
//       where: { car_number },
//     });
//     if (driver) {
//       return next(ApiError.conflict());
//     }
//     try {
//     User.create({
//       phone: req.body.phone,
//       name: req.body.name,
//       password: bcrypt.hashSync(req.body.password, 5),
//       verification_code: generateVerifyCode(),
//     })
//       .then((user: any) => {
//         const roles = req.body.roles
//           ? req.body.roles
//           : [USER_ROLE, DRIVER_ROLE];
//         Role.findAll({
//           where: {
//             name: {
//               [Op.or]: roles,
//             },
//           },
//         }).then((roles: any) => {
//           user.setRoles(roles).then(() => {
//             const authorities: Array<string> = [];
//             for (let i = 0; i < roles.length; i++) {
//               authorities.push(roles[i].name);
//             }
            
//             Driver.create({
//               user_id: user.id,
//               car_color: req.body.car_color,
//               car_model: req.body.car_model,
//               car_number: req.body.car_number,
//             });
//             const driver_info = {
//               car_color,
//               car_model,
//               car_number,
//             };

//             const accessToken = generateAccessToken(
//               user.id,
//               user.name,
//               authorities,
//               driver_info,
//             );
//             const refreshToken = generateRefreshToken(
//               user.id,
//               user.name,
//               authorities,
//               driver_info,
//             );
//             res.cookie('refreshToken', refreshToken, {
//               maxAge: MAX_AGE,
//               httpOnly: true,
//             });
//             return res.json({ accessToken, refreshToken });
//           });
//         });
//       })} catch {
//         return next(ApiError.forbidden());
//       };
// }} catch {
//   return next(ApiError.forbidden());
// };
// }
