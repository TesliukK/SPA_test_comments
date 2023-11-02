import { ApiError } from "../errors";
import { UserModel } from "../models";
import TokenModel from "../models/token.model";
import { ICredentials, ITokenPair, ITokenPayload, IUser } from "../types";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async register(body: IUser): Promise<void> {
    try {
      const { password } = body;
      const hashedPassword = await passwordService.hash(password);
      await UserModel.create({
        ...body,
        password: hashedPassword,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async login(
    credentials: ICredentials,
    user: IUser,
  ): Promise<ITokenPair> {
    try {
      const isMatched = await passwordService.compare(
        credentials.password,
        user.password,
      );
      if (!isMatched) {
        throw new ApiError("Invalid email or password", 409);
      }

      const tokenPair = tokenService.generateTokenPair({
        id: user.id,
        name: user.name,
      });

      await TokenModel.create({
        userId: user.id,
        ...tokenPair,
      });

      return tokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async refresh(
    tokenInfo: ITokenPair,
    jwtPayload: ITokenPayload,
  ): Promise<ITokenPair> {
    try {
      const tokenPair = tokenService.generateTokenPair({
        id: jwtPayload.id,
        name: jwtPayload.name,
      });
      await Promise.all([
        TokenModel.create({ userId: jwtPayload.id, ...tokenPair }),
        TokenModel.destroy({ where: { refreshToken: tokenInfo.refreshToken } }),
      ]);

      return tokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<void> {
    try {
      const user = await UserModel.findOne({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new ApiError("User not found", 404);
      }

      const userInstance = user.get({ plain: true });
      const isMatched = await passwordService.compare(
        oldPassword,
        userInstance.password,
      );

      if (!isMatched) {
        throw new ApiError("Wrong old password", 400);
      }

      const hashedNewPassword = await passwordService.hash(newPassword);
      await UserModel.update(
        { password: hashedNewPassword },
        {
          where: {
            id: userId,
          },
        },
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authService = new AuthService();
