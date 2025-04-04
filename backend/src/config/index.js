import { config } from 'dotenv';

if (process.env.NODE_ENV !== 'prod') {
  const configFile = `./.env.${process.env.NODE_ENV}`;
  config({ path: configFile });
} else {
  config();
}

export const PORT = process.env.PORT;
export const DB_URL = process.env.DB_URL;
export const APP_SECRET = process.env.APP_SECRET;
