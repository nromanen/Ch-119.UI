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