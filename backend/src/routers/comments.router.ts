import { Router } from "express";

import { commentController } from "../controllers";
import {
  authMiddleware,
  commentMiddleware,
  commonMiddleware,
  // reCaptchaMiddleware,
} from "../middlewares";
import { CommentModel } from "../models";
import { CommentValidator } from "../validators";

const router = Router();
router.get("/", commentController.getAll);

router.get(
  "/:commentId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid(CommentModel, "commentId"),
  commentMiddleware.getByIdAndThrow,
);

router.put(
  "/:commentId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid(CommentModel, "commentId"),
  commentMiddleware.checkCommentOwnership,
  commonMiddleware.isBodyValid(CommentValidator.updateComment),
  commentMiddleware.getByIdAndThrow,
  commentController.update,
);

router.post(
  "/",
  authMiddleware.checkAccessToken,
  // reCaptchaMiddleware.recaptchaMiddleware,
  commonMiddleware.isBodyValid(CommentValidator.createComment),
  commentController.create,
);

router.delete(
  "/:commentId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid(CommentModel, "commentId"),
  commentMiddleware.checkCommentOwnership,
  commentMiddleware.getByIdAndThrow,
  commentController.delete,
);

export const commentRouter = router;
