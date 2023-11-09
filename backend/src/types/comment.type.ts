import { IUser } from "./user.type";

export interface IComment {
  id?: number;
  text: string;
  userId: IUser;
  file?: string;
  parentId?: number;
  replies?: IComment[];
}
