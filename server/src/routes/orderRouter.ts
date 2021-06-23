import OrderController from '../controllers/orderController';

const Router = require('express');

const router = new Router();

const controller = new OrderController();

router.post('/', controller.create);
router.get('/', controller.getByStatus);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);

export default router;
