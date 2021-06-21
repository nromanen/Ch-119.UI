import * as express from 'express';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as winston from 'winston';
import * as dotenv from 'dotenv';
import routes from './routes';
import { PORT } from './constants/app';
import { API_PATH } from './constants/api';
import { PRODUCTION } from './constants/env';
import { JSON_LIMIT, JSON_TYPE } from './constants/json';
import sequelize from './db/sequelize/models/index';
import { CAR_TYPE, CITY, EXTRA_SERVICE } from './constants/modelsNames';
import { carTypes, extraServices } from './constants/seeders';
import errorHandler from './middlewares/errorHandlingMiddleware';
import { corsMiddleware } from './middlewares/cors';

dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  }),
);
app.use(cookieParser());
app.use(
  express.json({
    limit: JSON_LIMIT,
    type: JSON_TYPE,
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use(API_PATH, routes);
app.use(corsMiddleware);
app.use(errorHandler);

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== PRODUCTION) {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

const start = async () => {
  try {
    await sequelize.authenticate();
    const options = {
      // force: true,
      // alter: true,
    };
    await sequelize.sync(options);
    // Create tables if not exist asd
    // Uncomment if you don't have city table
    // and set optins to alter: true
    // comment after creating in db and disable alter (comment it)

    // await sequelize.models[CITY].create(
    //   {
    //     name: 'Chernivtsi',
    //     basePrice: 41,
    //     basePriceForKm: 10,
    //     car_types: carTypes.slice(0, 4),
    //     extra_services: extraServices,
    //   },
    //   {
    //     include: [sequelize.models[CAR_TYPE], sequelize.models[EXTRA_SERVICE]],
    //   },
    // );
    // End Possibly not right

    app.listen(PORT, () => {
      logger.log(
        'info',
        `⚡️[server]: Server is running at http://localhost:${PORT}`,
      );
    });
  } catch (error) {
    logger.log(error);
  }
};

start();

export default app;
