import { NextFunction, Request, Response } from "express";

import { commentService } from "../service";
import { IComment, ICommonResponse } from "../types";

class CommentController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IComment[]>> {
    try {
      const comments = await commentService.getAll();
      return res.json(comments);
    } catch (e) {
      next(e);
    }
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ICommonResponse<IComment>>> {
    try {
      const comment = await commentService.create(req.body);
      return res.status(201).json(comment);
    } catch (e) {
      next(e);
    }
  }

  public async getById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IComment>> {
    try {
      const { commentId } = req.params;
      const comment = await commentService.getById(commentId);
      return res.json(comment);
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
      const { commentId } = req.params;
      await commentService.delete(commentId);
      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const commentController = new CommentController();
