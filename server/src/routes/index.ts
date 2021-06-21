import * as express from 'express';
import { Request, Response } from 'express';

import { STATUS_OK } from '../constants/api';
import orderRouter from './orderRouter';
import infoRouter from './infoRouter';
import userRouter from './user';
import feedbackRouter from './feedbackRouter';
import { ORDER_ROUTE, INFO_ROUTE, FEEDBACK_ROUTE } from '../constants/routes';

const router = express.Router();

export const response = (res: Response, status: number, data: any) => {
  res.status(status).send({
    ...data,
  });
};

router.get('/', (req: Request, res: Response) => {
  response(res, STATUS_OK, { message: 'Server is running!' });
});
router.use(ORDER_ROUTE, orderRouter);
router.use(INFO_ROUTE, infoRouter);
router.use(FEEDBACK_ROUTE, feedbackRouter);

router.use('/user', userRouter);

export default router;
