import { Request, Response } from 'express';
import sequelize from '../db/sequelize/models/index';
import { order } from '../constants/modelsNames';
import { STATUS_BAD_REQUEST, STATUS_OK } from '../constants/api';

export default class OrderController {
  create = async (req: Request, res: Response): Promise<any> => {
    const { body } = req;
    try {
      const data = await sequelize.models[order].create(body);
      res.status(STATUS_OK).send({ data, status: STATUS_OK });
    } catch (error) {
      res.send({
        message: error.errors[0].message,
        status: STATUS_BAD_REQUEST,
      });
    }
  };

  get = async (req: Request, res: Response): Promise<any> => {
    // const {query} = req;
    try {
      const data = await sequelize.models[order].findAll();
      res.status(STATUS_OK).send({ data, status: STATUS_OK });
    } catch (error) {
      res
        .status(STATUS_BAD_REQUEST)
        .send({ message: error.errors[0].message, status: STATUS_BAD_REQUEST });
    }
  };
}
