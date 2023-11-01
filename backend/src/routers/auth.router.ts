import { Router } from "express";

import { authController } from "../controllers";
import { userMiddleware } from "../middlewares";

const router = Router();

router.post("/register", authController.register);

router.post(
  "/login",
  userMiddleware.getDynamicallyOrThrow("email"),
  authController.login,
);

export const authRouter = router;
