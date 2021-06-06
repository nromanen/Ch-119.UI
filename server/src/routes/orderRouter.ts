import OrderController from '../controllers/orderController';

const Router = require('express');

const router = new Router();

const controller = new OrderController();

router.post('/', controller.create);
router.get('/', controller.get);

export default router;
