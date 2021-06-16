import * as express from 'express';
import { authMiddleware, refreshTokenMiddleware } from '../middlewares/tokenMiddleware';
import authController from '../controllers/authController';
import { checkRoleMiddleware } from '../middlewares/checkRoleMiddleware';
import verifySignUp from '../middlewares/verifySignUp';

const router = express.Router();

const controller = new authController()

router.post('/registration', verifySignUp.checkDuplicatePhone, verifySignUp.checkRolesExisted, controller.registration);
router.post('/login', controller.login);
router.get('/auth',  checkRoleMiddleware('USER'), authMiddleware, controller.check);
router.post('/token', refreshTokenMiddleware, controller.refresh);
router.delete('/logout', controller.delToken);

export default router;