import { Router } from "express";

import { commentController } from "../controllers";

const router = Router();
router.get("/", commentController.getAll);

router.get("/:commentId", commentController.getById);

router.put("/:commentId", commentController.update);

router.post("/", commentController.create);

router.delete("/:commentId", commentController.delete);

export const commentRouter = router;
