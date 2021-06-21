import { Request, Response } from 'express';
import * as Joi from 'joi';
import sequelize from '../db/sequelize/models/index';
import { FEEDBACK } from '../constants/modelsNames';
import { STATUS_BAD_REQUEST, STATUS_OK } from '../constants/api';

const feedbackSchema = Joi.object({
  text: Joi.string().max(1000),

  rating: Joi.number().min(1).max(5).required(),

  author_id: Joi.number().required(),

  subject_id: Joi.number().required(),

  orderId: Joi.number().required(),
});
export default class FeedbackController {
  create = async (req: Request, res: Response): Promise<any> => {
    try {
      const validatedFeedback = await feedbackSchema.validateAsync(req.body);
      const data = await sequelize.models[FEEDBACK].create(validatedFeedback);
      res.status(STATUS_OK).send({ data, status: STATUS_OK });
    } catch (error) {
      res.send({
        message: error,
        status: STATUS_BAD_REQUEST,
      });
    }
  };
}
