import OrderController from '../controllers/orderController';

const Router = require('express');

const router = new Router();

const controller = new OrderController();

router.get('/', controller.getByStatus);
router.get('/list', controller.getWithFilter);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.put('/', controller.updateO);

export default router;
