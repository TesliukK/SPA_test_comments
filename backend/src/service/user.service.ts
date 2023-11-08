import { ApiError } from "../errors";
import { UserModel } from "../models";
import { IUser } from "../types";

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
}
export const userService = new UserService();
