import { Sequelize } from "sequelize";

import { configs } from "./config";

const sequelize = new Sequelize({
  database: configs.DB_NAME,
  username: configs.DB_USER,
  password: configs.DB_PASSWORD,
  host: configs.DB_HOST,
  port: parseInt(configs.DB_PORT, 10),
  dialect: "mysql",
});

export default sequelize;
