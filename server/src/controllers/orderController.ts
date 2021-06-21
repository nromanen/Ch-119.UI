import { Request, Response } from 'express';
import sequelize from '../db/sequelize/models/index';
import { ORDER } from '../constants/modelsNames';
import { STATUS_BAD_REQUEST, STATUS_OK } from '../constants/api';
import User from '../db/sequelize/models/user';

export default class OrderController {
  create = async (req: Request, res: Response): Promise<any> => {
    const { body } = req.body;

    try {
      const data = await sequelize.models[ORDER].create(body);

      res.status(STATUS_OK).send(data);
    } catch (error) {
      res.send({
        message: error,
        status: STATUS_BAD_REQUEST,
      });
    }
  };

  getByStatus = async (req: Request, res: Response): Promise<any> => {
    let { limit, page } = req.query;
    // const { where } = req.query;
    // res.json(where);

    page = page || '1';
    limit = limit || '5';
    const newLimit = Number(limit);

    const offset = +page * +limit - +limit;

    try {
      const data = await sequelize.models[ORDER].findAndCountAll({
        // where,
        offset,
        limit: newLimit,
      });
      res.status(STATUS_OK).send({ data, status: STATUS_OK });
    } catch (error) {
      console.log(error);

      res
        .status(STATUS_BAD_REQUEST)
        .send({ message: error.errors[0].message, status: STATUS_BAD_REQUEST });
    }
  };

  getById = async (req: Request, res: Response): Promise<any> => {
    // const { id } = req.params;
    // console.log(id);
    // try {
    //   const data = await sequelize.models[ORDER].findOne(
    //     {
    //       where: {
    //         id,
    //       },
    //     },
    //     {
    //       include: [
    //         {
    //           model: User,
    //         },
    //       ],
    //     },
    //   );
    //   res.status(STATUS_OK).send({ data, status: STATUS_OK });
    // } catch (error) {
    //   console.log(error);
    // res
    // .status(STATUS_BAD_REQUEST)
    // .send({ message: error.errors[0].message, status: STATUS_BAD_REQUEST });
  };

  update = async (req: Request, res: Response): Promise<any> => {
    const { id, status } = req.body;
    console.log(status);

    try {
      const data = await sequelize.models[ORDER].update(
        {
          status,
        },
        {
          where: {
            id,
          },
        },
      );

      res.status(STATUS_OK).send({ data, status: STATUS_OK });
    } catch (error) {
      console.log(error);

      res
        .status(STATUS_BAD_REQUEST)
        .send({ message: error.errors[0].message, status: STATUS_BAD_REQUEST });
    }
  };
}
