import { Request, Response } from 'express';
import sequelize from '../db/sequelize/models/index';
import { FEEDBACK } from '../constants/modelsNames';
import { STATUS_BAD_REQUEST, STATUS_OK } from '../constants/api';

export default class FeedbackController {
  create = async (req: Request, res: Response): Promise<any> => {
    try {
      const data = await sequelize.models[FEEDBACK].create(req.body);
      res.status(STATUS_OK).send({ data, status: STATUS_OK });
    } catch (error) {
      res.send({
        message: error,
        status: STATUS_BAD_REQUEST,
      });
    }
  };
}
