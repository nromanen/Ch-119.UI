import { Request, Response } from 'express';
import sequelize from '../db/sequelize/models/index';
import { ORDER, DRIVER, USER, CAR_TYPE } from '../constants/modelsNames';
import {
  STATUS_BAD_REQUEST,
  STATUS_OK,
  ORDER_ON_PAGE,
  PAGE_COUNT,
} from '../constants/api';

export default class OrderController {
  create = async (req: Request, res: Response): Promise<any> => {
    const { body } = req.body;

    try {
      const data = await sequelize.models[ORDER].create(body);

      res.status(STATUS_OK).send(data);
    } catch (error) {
      res.status(STATUS_BAD_REQUEST).send(error);
    }
  };

  getWithFilter = async (req: Request, res: Response): Promise<any> => {
    const { status, driverId, withDriver, withUser, limit } = req.query;
    const seqOptions: any = {
      where: {
        status,
      },
      attributes: { exclude: ['carTypeId', 'driver_id'] }, // exclude driver_id because return driverId
      limit: limit || 5,
      include: [
        {
          model: sequelize.models[CAR_TYPE], // return carType from car_types table
        },
      ],
      order: [
        // return orders recently created
        ['updatedAt', 'DESC'],
      ],
    };

    if (driverId) {
      seqOptions.where.driver_id = driverId;
    }
    if (withDriver) {
      seqOptions.include.push({
        model: sequelize.models[DRIVER],
        attributes: ['car_color', 'car_number', 'car_model', 'driver_rating'], // field that back from sequelize
      });
    }

    if (withUser) {
      seqOptions.include.push({
        model: sequelize.models[USER],
        attributes: ['name', 'phone'],
      });
    }

    try {
      const data = await sequelize.models[ORDER].findAndCountAll(seqOptions);
      res.status(STATUS_OK).send(data);
    } catch (error) {
      res.status(STATUS_BAD_REQUEST).send(error);
    }
  };

  // TODO change name in future
  updateO = async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.body;
      const data = await sequelize.models[ORDER].update(
        {
          ...req.body,
        },
        {
          where: {
            id,
          },
          returning: true,
        },
      );

      // TODO make another fetch for CAR_TYPE model values, do not right
      const dataNew = await sequelize.models[ORDER].findByPk(id, {
        include: [
          {
            model: sequelize.models[CAR_TYPE], // return carType from car_types table
          },
          {
            model: sequelize.models[USER],
            attributes: ['name', 'phone'],
          },
        ],
      });
      res.status(STATUS_OK).send(dataNew);
    } catch (error) {
      res.status(STATUS_BAD_REQUEST).send(error);
    }
  };

  getByStatus = async (req: Request, res: Response): Promise<any> => {
    let { limit, page } = req.query;
    const { where } = req.query;

    page = page || PAGE_COUNT;
    limit = limit || ORDER_ON_PAGE;
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
  };

  update = async (req: Request, res: Response): Promise<any> => {
    try {
      const { id, status, customer_id } = req.body.body;
      const driver = await this.getDriverIdByUserId(customer_id);
      const driverId = await driver.getDataValue('id');
      const data = await sequelize.models[ORDER].update(
        {
          status,
          driverId,
        },
        {
          where: {
            id,
          },
        },
      );

      res.status(STATUS_OK).send({ data, status: STATUS_OK });
    } catch (error) {
      res
        .status(STATUS_BAD_REQUEST)
        .send({ message: error.message, status: STATUS_BAD_REQUEST });
    }
  };
}
