import { DataTypes } from "sequelize";

import sequelize from "../db";
import { UserModel } from "./user.model";

const ActionModel = sequelize.define("actionToken", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: UserModel,
      key: "id",
    },
  },
  actionToken: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tokenType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default ActionModel;
