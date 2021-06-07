import * as express from 'express';
import { Request, Response } from 'express';
import { STATUS_OK } from '../constants/api';
import userRouter from './user';

const router = express.Router();

const response = (res: Response, status: number, data: any) => {
  res.status(status).send({
    ...data,
  });
};

router.get('/', (req: Request, res: Response) => {
  response(res, STATUS_OK, { message: 'Server is running!' });
});

router.use('/user', userRouter)


export default router;
