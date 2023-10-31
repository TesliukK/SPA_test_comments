// import { ApiError } from "../errors";
// import { User } from "../models";
// import { IPaginationResponse, IQuery, IUser } from "../types";

class UserService {
  // public async getWithPagination(
  //     query: IQuery,
  // ): Promise<IPaginationResponse<IUser>> {
  //     try {
  //         const queryStr = JSON.stringify(query);
  //         const queryObj = JSON.parse(
  //             queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`),
  //         );
  //
  //         const {
  //             page = 1,
  //             limit = 5,
  //             sortedBy = "createdAt",
  //             ...searchObject
  //         } = queryObj;
  //
  //         const skip = limit * (page - 1);
  //
  //         const users = await User.find(searchObject)
  //             .skip(skip)
  //             .limit(limit)
  //             .sort(sortedBy)
  //             .lean();
  //         const usersTotalCount = await User.countDocuments(searchObject);
  //
  //         const totalPages = Math.ceil(usersTotalCount / limit);
  //         return {
  //             page: +page,
  //             totalPages: totalPages,
  //             itemsCount: usersTotalCount,
  //             itemsFound: users.length,
  //             perPage: +limit,
  //             data: users.slice(0, limit),
  //         };
  //     } catch (e) {
  //         throw new ApiError(e.message, e.status);
  //     }
  // }
  //
  // public async getById(id: string): Promise<IUser> {
  //     try {
  //         return User.findById(id).lean();
  //     } catch (e) {
  //         throw new ApiError(e.message, e.status);
  //     }
  // }
  //
  // public async update(userId: string, data: Partial<IUser>): Promise<void> {
  //     try {
  //         return await User.findByIdAndUpdate(userId, data, { new: true });
  //     } catch (e) {
  //         throw new ApiError(e.message, e.status);
  //     }
  // }
  //
  // public async delete(userId: string): Promise<void> {
  //     try {
  //         await User.findById(userId).deleteOne({ _id: userId });
  //     } catch (e) {
  //         throw new ApiError(e.message, e.status);
  //     }
  // }
}

export const userService = new UserService();
