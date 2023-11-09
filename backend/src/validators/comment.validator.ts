import * as Joi from "joi";

export class CommentValidator {
  private static text = Joi.string().min(1).trim();
  private static parentId = Joi.number();
  static createComment = Joi.object({
    text: this.text,
    parentId: this.parentId,
  });

  static updateComment = Joi.object({
    text: this.text,
  });
}
