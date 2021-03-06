import OrderController from '../controllers/orderController';
import { authMiddleware } from '../middlewares/tokenMiddleware';

const Router = require('express');

const router = new Router();

const controller = new OrderController();

router.post('/', authMiddleware, controller.create);
router.get('/', authMiddleware, controller.getByStatus);
router.get('/list', controller.getWithFilter);
router.get('/:id', authMiddleware, controller.getById);
router.put('/:id', authMiddleware, controller.update);
router.put('/', authMiddleware, controller.updateO);

export default router;
