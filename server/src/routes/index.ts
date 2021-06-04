import * as express from 'express';
import { Request, Response } from 'express';
import * as appConstants from '../constants/app';

const router = express.Router();

const response = (req: Request, res: Response, code: number, data: any) => {
  res.status(code).send({
    ...data,
  });
};

router.get('/', (req: Request, res: Response) => {
  response(req, res, appConstants.SC_OK, { message: 'Server is running!' });
});

export default router;
