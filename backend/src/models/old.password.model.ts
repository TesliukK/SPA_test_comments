import { DataTypes } from "sequelize";

import sequelize from "../db";
import { UserModel } from "./user.model";

const OldPasswordModel = sequelize.define("OldPassword", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: UserModel,
      key: "id",
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

OldPasswordModel.belongsTo(UserModel, { foreignKey: "userId" });

export default OldPasswordModel;
