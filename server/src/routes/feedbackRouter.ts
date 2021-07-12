import FeedbackController from '../controllers/feedback.controller';

const Router = require('express');

const router = new Router();

const controller = new FeedbackController();

router.post('/', controller.create);

export default router;
