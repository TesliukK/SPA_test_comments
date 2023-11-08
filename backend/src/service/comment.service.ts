import { OrderItem } from "sequelize";

import { ApiError } from "../errors";
import { CommentModel } from "../models";
import { IComment } from "../types";

interface IPaginationResponse<T> {
  page: number;
  perPage: number;
  itemsCount: number;
  itemsFound: number;
  data: T[];
}
class CommentService {
  public async getAll(
    page: number = 1,
    limit: number = 10,
    sortFields: string[] = ["createdAt"],
    sortOrder: "asc" | "desc" = "asc",
  ): Promise<IPaginationResponse<IComment>> {
    try {
      const offset = (page - 1) * limit;
      const order: OrderItem[] = sortFields.map((field) => [field, sortOrder]);

      const comments = await CommentModel.findAndCountAll({
        offset,
        limit,
        order,
      });

      const commentArray: IComment[] = comments.rows.map(
        (comment) => comment.get() as IComment,
      );

      // Створіть об'єкт пагінації
      const pagination: IPaginationResponse<IComment> = {
        page,
        perPage: limit,
        itemsCount: commentArray.length,
        itemsFound: comments.count,
        data: commentArray,
      };

      return pagination;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async create(
    data: IComment,
    userId: number,
    parentId?: number,
  ): Promise<any> {
    try {
      const commentData = {
        ...data,
        userId: userId,
        parentId: parentId || null,
      };

      return await CommentModel.create(commentData);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

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
