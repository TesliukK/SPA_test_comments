import { Router } from "express";

import { authController } from "../controllers";
import { EActionTokenType } from "../enums";
import {authMiddleware, commonMiddleware, userMiddleware} from "../middlewares";
import {UserValidator} from "../validators";

const router = Router();

router.post("/register", authController.register);

router.post(
  "/login",
  commonMiddleware.isBodyValid(UserValidator.loginUser),
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

router.post(
  "/password/forgot",
  // commonMiddleware.isBodyValid(UserValidator.emailValidator),
  userMiddleware.getDynamicallyOrThrow("email"),
  authController.forgotPassword,
);

router.put(
  `/password/forgot/:token`,
  // authMiddleware.checkActionToken(EActionTokenType.forgot),
  // authMiddleware.checkOldPassword,
  authController.setForgotPassword,
);

router.post(
  "/activate",
  // commonMiddleware.isBodyValid(UserValidator.emailValidator),
  userMiddleware.getDynamicallyOrThrow("email"),
  authController.sendActivateToken,
);

router.put(
  `/activate/:token`,
  authMiddleware.checkActionToken(EActionTokenType.activate),
  authController.activate,
);

export const authRouter = router;
