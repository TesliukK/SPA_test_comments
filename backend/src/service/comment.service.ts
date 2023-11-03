import { ApiError } from "../errors";
import { CommentModel } from "../models";
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

  public async create(data: IComment, userId: number): Promise<any> {
    try {
      return await CommentModel.create({
        ...data,
        userId: userId,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  // public async create(data: IComment): Promise<any> {
  //   try {
  //     return await CommentModel.create({
  //       ...data,
  //     });
  //   } catch (e) {
  //     throw new ApiError(e.message, e.status);
  //   }
  // }

  public async getById(commentId: string): Promise<IComment | null> {
    try {
      const comment = await CommentModel.findOne({
        where: { id: commentId },
      });
      return comment.toJSON();
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async update(
    commentId: string,
    data: Partial<IComment>,
  ): Promise<void> {
    try {
      await CommentModel.update(data, {
        where: {
          id: commentId,
        },
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
