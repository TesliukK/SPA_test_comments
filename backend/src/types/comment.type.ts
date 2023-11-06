import { IUser } from "./user.type";

export interface IComment {
  id?: number;
  text: string;
  userId: IUser;
  replies: IComment[];
  file: string;
}
