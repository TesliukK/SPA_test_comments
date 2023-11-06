import { DataTypes } from "sequelize";

import sequelize from "../db";
import { UserModel } from "./user.model";

const CommentModel = sequelize.define("comment", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: UserModel,
      key: "id",
    },
  },
  parentId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  file: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

CommentModel.belongsTo(UserModel, {
  foreignKey: "userId",
});

CommentModel.hasMany(CommentModel, {
  foreignKey: "parentId",
  as: "replies",
});

export { CommentModel };
