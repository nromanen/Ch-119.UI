import * as express from 'express';
import * as cors from 'cors';
import * as winston from 'winston';
import * as dotenv from 'dotenv';
import routes from './routes/index';

dotenv.config();

const PRODUCTION = 'production';
const PORT: number = Number(process.env.PORT) || 8080;

const app = express();

app.use(cors());
app.use(express.json({ limit: '100mb', type: 'application/json' }));
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/', routes);

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== PRODUCTION) {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

app.listen(PORT, () => {
  logger.log(
    'info',
    `⚡️[server]: Server is running at http://localhost:${PORT}`,
  );
});

export default app;
