import * as express from 'express';
import * as cors from 'cors';
import * as winston from 'winston';
import * as dotenv from 'dotenv';
import routes from './routes/index';
import * as appConstants from './constants/app';

dotenv.config();

const app = express();

app.use(cors());
app.use(
  express.json({
    limit: appConstants.JSON_LIMIT,
    type: appConstants.JSON_TYPE,
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use(appConstants.API_PATH, routes);

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== appConstants.PRODUCTION) {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

app.listen(appConstants.PORT, () => {
  logger.log(
    'info',
    `⚡️[server]: Server is running at http://localhost:${appConstants.PORT}`,
  );
});

export default app;
