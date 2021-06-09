import InfoController from '../controllers/infoController';

const Router = require('express');

const router = new Router();

const controller = new InfoController();

router.get('/', controller.get);

export default router;
