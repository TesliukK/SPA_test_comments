import { NextFunction, Request, Response } from "express";

// import { UploadedFile } from "express-fileupload";
import { userService } from "../service";
import { IComment, IUser } from "../types";

class UserController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IComment[]>> {
    try {
      const users = await userService.getAll();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  public async getById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser>> {
    try {
      const { user } = res.locals;
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser>> {
    try {
      const { params, body } = req;

      const updatedUser = await userService.update(params.userId, body);

      return res.status(201).json(updatedUser);
    } catch (e) {
      next(e);
    }
  }

  public async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<void>> {
    try {
      const { userId } = req.params;

      await userService.delete(userId);

      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  // ----------------------------------------------------------
  // Завантаження на aws не працює, бо заблокували акаунт

  // public async uploadAvatar(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction,
  // ): Promise<Response<IUser>> {
  //   try {
  //     const userEntity = res.locals.user as IUser;
  //     const avatar = req.files.avatar as UploadedFile;
  //
  //     const user = await userService.uploadAvatar(avatar, userEntity);
  //
  //     return res.status(201).json(user);
  //   } catch (e) {
  //     next(e);
  //   }
  // }
  //
  // public async deleteAvatar(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction,
  // ): Promise<Response<IUser>> {
  //   try {
  //     const userEntity = res.locals.user as IUser;
  //
  //     const user = await userService.deleteAvatar(userEntity);
  //
  //     return res.status(201).json(user);
  //   } catch (e) {
  //     next(e);
  //   }
  // }
}

export const userController = new UserController();
