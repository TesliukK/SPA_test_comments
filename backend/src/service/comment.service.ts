import { ApiError } from "../errors";
import { CommentModel } from "../models/comment.model";
import { IComment } from "../types";

class CommentService {
  public async getAll(): Promise<IComment[]> {
    try {
      const comments = await CommentModel.findAll();
      return comments.map((comment) => comment.toJSON());
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async create(data: IComment): Promise<any> {
    try {
      return await CommentModel.create({
        ...data,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async getById(commentId: string): Promise<void> {
    try {
      await CommentModel.findOne({
        where: { id: commentId },
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async delete(commentId: string): Promise<void> {
    try {
      await CommentModel.destroy({
        where: { id: commentId },
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const commentService = new CommentService();
