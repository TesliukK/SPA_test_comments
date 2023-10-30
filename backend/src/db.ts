import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  database: process.env.DB_NAME as string,
  username: "root",
  password: "root",
  host: process.env.DB_HOST as string,
  port: parseInt(process.env.DB_PORT as string, 10),
  dialect: "mysql", // Діалект бази даних (MySQL)
});

export default sequelize;
