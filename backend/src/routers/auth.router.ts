import { Router } from "express";

import { authController } from "../controllers";
import { authMiddleware, userMiddleware } from "../middlewares";

const router = Router();

router.post("/register", authController.register);

router.post(
  "/login",
  userMiddleware.getDynamicallyOrThrow("email"),
  authController.login,
);

router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh,
);

router.post(
  "/password/change",
  authMiddleware.checkAccessToken,
  authController.changePassword,
);

export const authRouter = router;
