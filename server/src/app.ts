import * as express from 'express';
import * as cors from 'cors';
import * as winston from 'winston';
import * as dotenv from 'dotenv';
import routes from './routes/index';
import { PORT } from './constants/app';
import { API_PATH } from './constants/api';
import { PRODUCTION } from './constants/env';
import { JSON_LIMIT, JSON_TYPE } from './constants/json';
import sequelize from './db/sequelize/models/index';

dotenv.config();

const app = express();

app.use(cors());
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
