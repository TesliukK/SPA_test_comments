// import { UploadedFile } from "express-fileupload";

import { ApiError } from "../errors";
import { UserModel } from "../models";
import { IUser } from "../types";
// import { s3Service } from "./s3.service";

class UserService {
  public async getAll(): Promise<IUser[]> {
    try {
      const users = await UserModel.findAll();
      return users.map((users) => users.toJSON());
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async getById(userId: string): Promise<IUser | null> {
    try {
      const user = await UserModel.findOne({
        where: { id: userId },
      });
      return user.toJSON();
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async update(userId: string, data: Partial<IUser>): Promise<void> {
    try {
      await UserModel.update(data, {
        where: {
          id: userId,
        },
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async delete(userId: string): Promise<void> {
    try {
      await UserModel.destroy({
        where: { id: userId },
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  // ----------------------------------------------------------
  // Завантаження на aws не працює, бо заблокували акаунт

  // public async uploadAvatar(file: UploadedFile, user: IUser): Promise<IUser> {
  //   try {
  //     const filePath = await s3Service.uploadFile(
  //       file,
  //       "user",
  //       user.id.toString(),
  //     );
  //
  //     if (user.avatar) {
  //       await s3Service.deleteFile(user.avatar);
  //     }
  //
  //     const updatedUser = await UserModel.findByPk(user.id);
  //
  //     if (updatedUser) {
  //       updatedUser.dataValues.avatar = filePath;
  //       await updatedUser.save();
  //       return updatedUser.toJSON() as IUser;
  //     } else {
  //       throw new Error("User not found");
  //     }
  //   } catch (e) {
  //     throw new ApiError(e.message, e.status);
  //   }
  // }
  // public async deleteAvatar(user: IUser): Promise<IUser> {
  //   try {
  //     if (!user.avatar) {
  //       throw new ApiError("User doesn't have an avatar", 422);
  //     }
  //
  //     await s3Service.deleteFile(user.avatar);
  //
  //     const updatedUser = await UserModel.findByPk(user.id);
  //
  //     if (updatedUser) {
  //       updatedUser.dataValues.avatar = null;
  //       await updatedUser.save();
  //       return updatedUser.toJSON() as IUser;
  //     } else {
  //       throw new Error("User not found");
  //     }
  //   } catch (e) {
  //     throw new ApiError(e.message, e.status);
  //   }
  // }
}
export const userService = new UserService();
