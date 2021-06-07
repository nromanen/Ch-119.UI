import * as express from 'express';
import userController from '../controllers/user';
import authMiddleware from '../middlewares/authMiddleware'

const router = express.Router();

const controller = new userController();

router.post('/registration', controller.registration);
router.post('/login', controller.login);
router.get('/auth', authMiddleware, controller.check);

export default router;