import { Request, Response } from 'express';
import sequelize from '../db/sequelize/models/index';
import { STATUS_BAD_REQUEST, STATUS_OK } from '../constants/api';
import { CAR_TYPE, CITY, EXTRA_SERVICE } from '../constants/modelsNames';

export default class InfoController {
  get = async (req: Request, res: Response): Promise<any> => {
    const { name } = req.query;
    console.log(name, 'name');

    try {
      const data = await sequelize.models[CITY].findOne({
        where: { name },
        include: [
          {
            model: sequelize.models[CAR_TYPE],
            as: 'car_types',
          },
          {
            model: sequelize.models[EXTRA_SERVICE],
            as: 'extra_services',
          },
        ],
      });
      res.status(STATUS_OK).send(data);
    } catch (error) {
      res
        .status(STATUS_BAD_REQUEST)
        .send({ message: error.errors[0].message, status: STATUS_BAD_REQUEST });
    }
  };
}
