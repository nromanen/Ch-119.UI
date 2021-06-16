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
import errorHandler from './middlewares/errorHandlingMiddleware';

dotenv.config();

const app = express();

app.use(cors( {
  credentials: true,
  origin: process.env.CLIENT_URL
}));
app.use(cookieParser());
app.use(
  express.json({
    limit: JSON_LIMIT,
    type: JSON_TYPE,
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use(API_PATH, routes);

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

app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('Sequielize connected');
    const res = await sequelize.sync({
      alter: true,
    });

    console.log('created tables', res.models);

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