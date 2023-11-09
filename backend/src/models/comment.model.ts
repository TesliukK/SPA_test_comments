import { DataTypes, Model } from "sequelize";

import sequelize from "../db";
import { UserModel } from "./user.model";

class CommentModel extends Model {
  public id!: number;
  public text!: string;
  public userId!: number;
  public parentId?: number;
  public file?: string; // Додаємо поле для файлу

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CommentModel.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    text: {
      type: DataTypes.STRING,
      // allowNull: false,
      defaultValue: "rtr",
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
    },
    file: {
      // Додаємо конфігурацію для файлу
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "comment",
  },
);

CommentModel.belongsTo(UserModel, { foreignKey: "userId", as: "user" });
CommentModel.hasMany(CommentModel, { foreignKey: "parentId", as: "replies" });
CommentModel.belongsTo(CommentModel, { foreignKey: "parentId", as: "parent" });

export { CommentModel };
