import { EUserStatus } from "../enums";

export interface IUser {
  id?: number;
  nameUser: string;
  email: string;
  password: string;
  avatar?: string;
  status: EUserStatus;
}
