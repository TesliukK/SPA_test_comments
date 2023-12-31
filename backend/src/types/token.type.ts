import { IUser } from "./user.type";

export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}

export type ITokenPayload = Pick<IUser, "id" | "nameUser">;

export type IActionTokenPayload = Pick<ITokenPayload, "id">;
