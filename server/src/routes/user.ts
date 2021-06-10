import * as express from 'express';
import { refreshTokenMiddleware } from '../middlewares/tokenMiddleware';
import { signup, signin, refresh, delToken, check } from '../controllers/auth.controller';
import { checkRoleMiddleware } from '../middlewares/checkRoleMiddleware';
import verifySignUp from '../middlewares/verifySignUp';

const router = express.Router();

router.post('/registration', verifySignUp.checkDuplicatePhone, verifySignUp.checkRolesExisted, signup);
router.post('/login', signin);
router.get('/auth',  checkRoleMiddleware('user'), check);
router.post('/token', refreshTokenMiddleware, refresh);
router.delete('/logout', delToken);

export default router;