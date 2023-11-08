import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { CommentModel } from "../models";
import TokenModel from "../models/token.model";

class CommentMiddleware {
  public async getByIdAndThrow(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { commentId } = req.params;

      const comment = await CommentModel.findOne({
        where: { id: commentId },
      });

      if (!comment) {
        throw new ApiError("User not found", 422);
      }

      res.locals.comment = comment;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async checkCommentOwnership(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const accessToken = req.get("Authorization");
      const tokenInfo = await TokenModel.findOne({
        where: { accessToken: accessToken },
      });

      if (!tokenInfo) {
        throw new ApiError("Unauthorized", 401);
      }

      const userId = tokenInfo.get("userId") as number;
      const { commentId } = req.params;
      const comment = await CommentModel.findOne({
        where: { id: commentId },
      });
      if (!comment) {
        throw new ApiError("Comment not found", 404);
      }

      if (comment.dataValues.userId !== userId) {
        throw new ApiError("You are not the owner of this comment", 403);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
}
export const commentMiddleware = new CommentMiddleware();
