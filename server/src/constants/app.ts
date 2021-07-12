import * as dotenv from 'dotenv';

dotenv.config();

export const PORT: number = Number(process.env.PORT) || 8080;

export default PORT;
