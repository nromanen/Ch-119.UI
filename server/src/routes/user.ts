import * as express from 'express';
import {
  authMiddleware,
  refreshTokenMiddleware,
} from '../middlewares/tokenMiddleware';
import AuthController from '../controllers/authController';
import TokenController from '../controllers/tokenController';
import { checkRoleMiddleware } from '../middlewares/checkRoleMiddleware';
import verifySignUp from '../middlewares/verifySignUp';
import { USER_ROLE } from '../constants/modelsNames';

const router = express.Router();

const controller = new AuthController();
const tokenController = new TokenController();

router.post(
  '/registration',
  verifySignUp.checkDuplicatePhone,
  controller.registration,
);
router.post('/login', verifySignUp.checkVerifyCode, controller.login, controller.authorization);
router.get(
  '/auth',
  checkRoleMiddleware(USER_ROLE),
  authMiddleware,
  tokenController.check,
);
router.get('/token', refreshTokenMiddleware, tokenController.refresh);
router.delete('/logout', tokenController.delToken);

export default router;