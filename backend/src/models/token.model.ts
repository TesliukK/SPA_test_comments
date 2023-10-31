import { DataTypes } from "sequelize";

import sequelize from "../db";
import { UserModel } from "./user.model";

const TokenModel = sequelize.define("token", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: UserModel,
      key: "id",
    },
  },
  accessToken: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default TokenModel;
