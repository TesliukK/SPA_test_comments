import { Router } from "express";

import { userController } from "../controllers";
import {
  authMiddleware,
  commonMiddleware,
  // fileMiddleware,
  userMiddleware,
} from "../middlewares";
import { UserModel } from "../models";
import { UserValidator } from "../validators";

const router = Router();

router.get("/", authMiddleware.checkAccessToken, userController.getAll);

router.get(
  "/:userId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid(UserModel, "userId"),
  userMiddleware.getByIdAndThrow,
  userController.getById,
);

router.put(
  "/:userId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid(UserModel, "userId"),
  commonMiddleware.isBodyValid(UserValidator.updateUser),
  userMiddleware.getByIdAndThrow,
  userController.update,
);

router.delete(
  "/:userId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid(UserModel, "userId"),
  userMiddleware.getByIdAndThrow,
  userController.delete,
);
// ----------------------------------------------------------
// Завантаження на aws не працює, бо заблокували акаунт
// router.put(
//   "/:userId/avatar",
//   authMiddleware.checkAccessToken,
//   commonMiddleware.isIdValid(UserModel, "userId"),
//   fileMiddleware.isAvatarValid,
//   userMiddleware.getByIdAndThrow,
//   userController.uploadAvatar,
// );
// router.delete(
//   "/:userId/avatar",
//   authMiddleware.checkAccessToken,
//   commonMiddleware.isIdValid(UserModel, "userId"),
//   userMiddleware.getByIdAndThrow,
//   userController.deleteAvatar,
// );
export const userRouter = router;
