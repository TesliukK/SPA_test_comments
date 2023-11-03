import * as Joi from "joi";

import { regexConstants } from "../constants";

export class UserValidator {
  private static nameUser = Joi.string().min(2).max(50).trim();
  private static email = Joi.string()
    .regex(regexConstants.EMAIL)
    .lowercase()
    .trim();
  private static password = Joi.string().regex(regexConstants.PASSWORD);

  static createUser = Joi.object({
    nameUser: this.nameUser.required(),
    email: this.email.required(),
    password: this.password.required(),
  });

  static updateUser = Joi.object({
    nameUser: this.nameUser,
  });

  static loginUser = Joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });

  static emailValidator = Joi.object({
    email: this.email.required(),
  });

  static changeUserPassword = Joi.object({
    oldPassword: this.password.required(),
    newPassword: this.password.required(),
  });
}
