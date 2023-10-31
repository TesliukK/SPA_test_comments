import { Router } from "express";

import { commentController } from "../controllers";

const router = Router();
router.get("/", commentController.getAll);

router.get("/:userId", commentController.getById);

router.post("/", commentController.create);

router.delete("/:commentId", commentController.delete);

export const commentRouter = router;
