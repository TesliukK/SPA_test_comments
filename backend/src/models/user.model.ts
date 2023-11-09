import { DataTypes } from "sequelize";

import sequelize from "../db";
import { EUserStatus } from "../enums";

const UserModel = sequelize.define("user", {
  nameUser: { type: DataTypes.STRING, unique: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  avatar: { type: DataTypes.STRING },
  status: {
    type: DataTypes.ENUM(
      EUserStatus.Active,
      EUserStatus.Inactive,
      EUserStatus.Blocked,
    ),
    defaultValue: EUserStatus.Inactive,
  },
});

export { UserModel };
