import { Request, Response } from 'express';
import sequelize from '../db/sequelize/models/index';
import { STATUS_BAD_REQUEST, STATUS_OK } from '../constants/api';
import { CAR_TYPE, CITY, EXTRA_SERVICE, ROLE } from '../constants/modelsNames';

export default class InfoController {
  get = async (req: Request, res: Response): Promise<any> => {
    const { name } = req.query;

    try {
      const data = await sequelize.models[CITY].findOne({
        where: { name },
        include: [
          {
            model: sequelize.models[CAR_TYPE],
            as: 'car_types', // TODO CHANGE without _
          },
          {
            model: sequelize.models[EXTRA_SERVICE],
            as: 'extra_services', // TODO CHANGE without _
          },
        ],
      });

      const roles = await sequelize.models[ROLE].findAll({
        attributes: ['id', 'name'],
      });
      const dataJson: any = data.toJSON();
      dataJson.roles = roles;
      res.status(STATUS_OK).send(dataJson);
    } catch (error) {
      res.status(STATUS_BAD_REQUEST).send(error.errors[0].message);
    }
  };
}
