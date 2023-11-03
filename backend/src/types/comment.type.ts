import { IUser } from "./user.type";

export interface IComment {
  text: string;
  userId: IUser;
}
