import { DataTypes } from "sequelize";

import sequelize from "../db";
import { EUserStatus } from "../enums";

export const UserModel = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true },
  email: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
  status: {
    type: DataTypes.ENUM(
      EUserStatus.Active,
      EUserStatus.Inactive,
      EUserStatus.Blocked,
    ),
    defaultValue: EUserStatus.Inactive,
  },
});
