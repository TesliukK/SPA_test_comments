import { OrderItem } from "sequelize";

import { ApiError } from "../errors";
import { CommentModel, UserModel } from "../models";
import { IComment, IPaginationResponse } from "../types";

class CommentService {
  public async getAll(
    page: number = 1,
    limit: number = 25,
    sortFields: string[] = ["createdAt"],
    sortOrder: "asc" | "desc" = "asc",
  ): Promise<IPaginationResponse<IComment>> {
    try {
      const offset = (page - 1) * limit;
      const order: OrderItem[] = sortFields.map((field) => [field, sortOrder]);

      const comments = await CommentModel.findAndCountAll({
        where: { parentId: null },
        offset,
        limit,
        order,
        include: [
          {
            model: UserModel,
            as: "user",
          },
        ],
      });

      const commentArray: IComment[] = comments.rows.map(
        (comment) => comment.get() as IComment,
      );

      return {
        page,
        perPage: limit,
        itemsCount: commentArray.length,
        itemsFound: comments.count,
        data: commentArray,
      };
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async create(
    data: IComment,
    userId: number,
    parentId?: number,
    imageUrl?: string,
  ): Promise<any> {
    try {
      const commentData = {
        ...data,
        userId,
        parentId,
        file: imageUrl,
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
        include: [
          {
            model: UserModel,
            as: "user",
          },
          {
            model: CommentModel,
            as: "replies",
            include: [
              {
                model: UserModel,
                as: "user",
              },
            ],
          },
        ],
      });
      return comment?.get({ plain: true }) as IComment;
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
