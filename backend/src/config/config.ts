import { config } from "dotenv";

config();

export const configs = {
  PORT: process.env.PORT,
  DB_USER: process.env.DB_USER,
  DB_HOST: process.env.DB_HOST,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT,

  ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  REFRESH_SECRET: process.env.JWT_REFRESH_SECRETT,

  FORGOT_SECRET: process.env.JWT_FORGOT_SECRET,
  ACTIVATE_SECRET: process.env.JWT_ACTIVATE_SECRET,

  NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
  NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD,

  FRONT_URL: process.env.FRONT_URL,
};
