import { Router } from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../contoller/category.controller";
import authMiddleware from "../middleware/authmiddleware";

const router = Router();

router.post("/", authMiddleware, createCategory);
router.get("/", getCategories);
router.put("/:id", authMiddleware, updateCategory);
router.delete("/:id", authMiddleware, deleteCategory);

export default router;
