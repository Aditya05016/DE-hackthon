import { Router } from "express";
import {
  createSubcategory,
  getSubcategories,
  updateSubcategory,
  deleteSubcategory,
} from "../contoller/subCategory.controller";
import authMiddleware from "../middleware/authmiddleware";

const router = Router();

router.post("/",authMiddleware, createSubcategory);
router.get("/",authMiddleware, getSubcategories);
router.put("/:id", authMiddleware, updateSubcategory);
router.delete("/:id", authMiddleware, deleteSubcategory);

export default router;
