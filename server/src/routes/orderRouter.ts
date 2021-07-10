import OrderController from '../controllers/orderController';
// import { authMiddleware } from '../middlewares/tokenMiddleware';

const Router = require('express');

const router = new Router();

const controller = new OrderController();

router.post('/', controller.create);
router.get('/', controller.getByStatus);
router.get('/list', controller.getWithFilter);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.put('/', controller.updateO);

export default router;
