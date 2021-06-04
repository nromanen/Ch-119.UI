import * as dotenv from 'dotenv';

dotenv.config();

export const PRODUCTION = 'production';
export const DEVELOPMENT = 'development';
export const PORT: number = Number(process.env.PORT) || 8080;
export const JSON_LIMIT = '100mb';
export const JSON_TYPE = 'application/json';
export const API_PATH = '/api/v1/';
export const SC_OK = 200;
