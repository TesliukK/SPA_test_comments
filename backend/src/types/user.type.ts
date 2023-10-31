import { EUserStatus } from "../enums";

export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  status: EUserStatus;
}
