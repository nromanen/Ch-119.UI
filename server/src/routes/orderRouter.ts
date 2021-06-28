import OrderController from '../controllers/orderController';
import { authMiddleware } from '../middlewares/tokenMiddleware';

const Router = require('express');

const router = new Router();

const controller = new OrderController();

router.post('/', authMiddleware, controller.create);
router.get('/', authMiddleware, controller.getByStatus);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);

export default router;
