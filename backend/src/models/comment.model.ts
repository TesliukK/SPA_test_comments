import { DataTypes, Model } from "sequelize";

import sequelize from "../db";
import { UserModel } from "./user.model";

class CommentModel extends Model {
  public id!: number;
  public text!: string;
  public userId!: number;
  public parentId!: number | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CommentModel.init(
  {
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
      references: {
        model: CommentModel,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "comment",
  },
);

CommentModel.belongsTo(UserModel, {
  foreignKey: "userId",
});

CommentModel.hasMany(CommentModel, {
  foreignKey: "parentId",
  as: "responses",
});

export { CommentModel };
