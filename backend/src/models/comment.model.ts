import { DataTypes, Model } from "sequelize";

import sequelize from "../db";
import { IUser } from "../types";
import { UserModel } from "./user.model";

class CommentModel extends Model {
  public id!: number;
  public text!: string;
  public userId!: IUser;
  public parentId?: number;

  public readonly replies?: CommentModel[];

  static associate(models: any) {
    CommentModel.belongsTo(models.UserModel, {
      foreignKey: "userId",
    });

    CommentModel.hasMany(CommentModel, {
      foreignKey: "parentId",
      as: "replies",
    });
  }
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
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "comment",
    tableName: "comments",
  },
);

export { CommentModel };
