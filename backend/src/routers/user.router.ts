import { Router } from "express";

import { userController } from "../controllers";
import { authMiddleware, userMiddleware } from "../middlewares";

const router = Router();

router.get("/", authMiddleware.checkAccessToken, userController.getAll);

router.get(
  "/:userId",
  authMiddleware.checkAccessToken,
  userMiddleware.getByIdAndThrow,
  userController.getById,
);

router.put(
  "/:userId",
  authMiddleware.checkAccessToken,
  userMiddleware.getByIdAndThrow,
  userController.update,
);

router.delete(
  "/:userId",
  authMiddleware.checkAccessToken,
  userMiddleware.getByIdAndThrow,
  userController.delete,
);
export const userRouter = router;
