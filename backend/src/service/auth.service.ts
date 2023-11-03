import { EActionTokenType, EEmailActions, EUserStatus } from "../enums";
import { ApiError } from "../errors";
import { ActionModel, UserModel } from "../models";
import OldPasswordModel from "../models/old.password.model";
import TokenModel from "../models/token.model";
import { ICredentials, ITokenPair, ITokenPayload, IUser } from "../types";
import { emailService } from "./email.service";
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

      await Promise.all([
        emailService.sendMail(body.email, EEmailActions.WELCOME),
      ]);
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
        nameUser: user.nameUser,
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
        nameUser: jwtPayload.nameUser,
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

  public async forgotPassword(user: IUser): Promise<void> {
    try {
      const actionToken = tokenService.generateActionToken(
        { id: user.id },
        EActionTokenType.forgot,
      );
      await ActionModel.create({
        actionToken,
        tokenType: EActionTokenType.forgot,
        userId: user.id,
      });

      await emailService.sendMail(user.email, EEmailActions.FORGOT_PASSWORD, {
        token: actionToken,
      });
      await OldPasswordModel.create({
        userId: user.id,
        password: user.password,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async setForgotPassword(
    password: string,
    id: string,
    token: string,
  ): Promise<void> {
    try {
      const hashedPassword = await passwordService.hash(password);
      await UserModel.update(
        { password: hashedPassword },
        {
          where: { id },
        },
      );

      await ActionModel.destroy({
        where: {
          actionToken: token,
          tokenType: EActionTokenType.forgot,
        },
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async sendActivateToken(user: IUser): Promise<void> {
    try {
      const actionToken = tokenService.generateActionToken(
        { id: user.id },
        EActionTokenType.activate,
      );
      await ActionModel.create({
        actionToken,
        tokenType: EActionTokenType.activate,
        userId: user.id,
      });

      await emailService.sendMail(user.email, EEmailActions.ACTIVATE, {
        token: actionToken,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async activate(userId: number): Promise<void> {
    try {
      await Promise.all([
        UserModel.update(
          { status: EUserStatus.Active },
          { where: { id: userId } },
        ),
        TokenModel.destroy({
          where: {
            _user_id: userId,
            tokenType: EActionTokenType.activate,
          },
        }),
      ]);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authService = new AuthService();
