import { Request, Response } from 'express';
import sequelize from '../db/sequelize/models/index';
import { ORDER, DRIVER, USER } from '../constants/modelsNames';
import { STATUS_BAD_REQUEST, STATUS_OK } from '../constants/api';

export default class OrderController {
  create = async (req: Request, res: Response): Promise<any> => {
    const { body } = req.body;
    console.log(body);

    try {
      const data = await sequelize.models[ORDER].create(body);

      res.status(STATUS_OK).send(data);
    } catch (error) {
      res.status(STATUS_BAD_REQUEST).send(error);
    }
  };

  getByStatus = async (req: Request, res: Response): Promise<any> => {
    let { limit, page } = req.query;
    const { where } = req.query;
    // res.json(where);

    page = page || '1';
    limit = limit || '5';
    const newLimit = Number(limit);

    const offset = +page * +limit - +limit;

    try {
      const data = await sequelize.models[ORDER].findAndCountAll({
        where: {
          status: req.query.status,
        },
        offset,
        limit: newLimit,
        include: sequelize.models[USER],
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
    const { id } = req.params;

    try {
      const data = await sequelize.models[ORDER].findOne({
        where: {
          id,
        },
        include: sequelize.models[USER],
      });

      res.status(STATUS_OK).send({ data, status: STATUS_OK });
    } catch (error) {
      console.log(error);
      res
        .status(STATUS_BAD_REQUEST)
        .send({ message: error.errors[0].message, status: STATUS_BAD_REQUEST });
    }
  };

  getDriverIdByUserId = async (id: any) => {
    const res = await sequelize.models[DRIVER].findOne({
      where: {
        user_id: id,
      },
    });

    return res;

    // then((driver: any) => {
    //   console.log("IS DRIVER _-------------------", driver);

    //   return driver.dataValues.id;
    // })
  };

  update = async (req: Request, res: Response): Promise<any> => {
    try {
      const { id, status, customer_id } = req.body.body;
      const driver = await this.getDriverIdByUserId(customer_id);
      const driverId = await driver.getDataValue('id');
      const data = await sequelize.models[ORDER].update(
        {
          status,
          driver_id: driverId,
        },
        {
          where: {
            id,
          },
        },
      );

      res.status(STATUS_OK).send({ data, status: STATUS_OK });
    } catch (error) {
      res.status(STATUS_BAD_REQUEST).send({ message: error.message });
    }
  };
}
