import { NextFunction, Request, Response } from "express";

import { commentService } from "../service";
import { IComment, ICommonResponse, ITokenPayload } from "../types";

class CommentController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IComment[]>> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 25;
      const sortFields = (
        (req.query.sortFields as string) || "createdAt"
      ).split(",") as string[];
      const sortOrder = (req.query.sortOrder as "asc" | "desc") || "asc";

      const paginationResponse = await commentService.getAll(
        page,
        limit,
        sortFields,
        sortOrder,
      );

      return res.json(paginationResponse);
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
      const { id } = req.res.locals.jwtPayload as ITokenPayload;
      const parentId = req.body.parentId || null;

      const comment = await commentService.create(req.body, id, parentId);
      const commentWithReplies = await commentService.getById(
        comment.id.toString(),
      );

      return res.status(201).json(commentWithReplies);
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

  public async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IComment>> {
    try {
      const { params, body } = req;

      const updatedComment = await commentService.update(
        params.commentId,
        body,
      );

      return res.status(201).json(updatedComment);
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
