import { DataTypes } from "sequelize";

import sequelize from "../db";

export const CommentModel = sequelize.define("comment", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING, unique: true },
  email: { type: DataTypes.STRING },
  text: { type: DataTypes.STRING },
});
