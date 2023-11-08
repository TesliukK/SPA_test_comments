import { Router } from "express";

import { userController } from "../controllers";
import {
  authMiddleware,
  commonMiddleware,
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
export const userRouter = router;
