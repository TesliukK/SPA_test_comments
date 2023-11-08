import * as Joi from "joi";

export class CommentValidator {
  private static text = Joi.string().min(1).trim();

  static createComment = Joi.object({
    text: this.text.required(),
  });

  static updateComment = Joi.object({
    text: this.text,
  });
}
