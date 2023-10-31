import { IUser } from "./user.type";

export type ICredentials = Pick<IUser, "email" | "password">;
