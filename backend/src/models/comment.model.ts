import { DataTypes } from "sequelize";

import sequelize from "../db";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    secondName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "default",
    },
  },
  {
    timestamps: true, // Додавання полів createdAt та updatedAt
    underscored: true, // Використання підкреслення в назвах полів
    tableName: "users", // Назва таблиці в базі даних
  },
);

export default User;
