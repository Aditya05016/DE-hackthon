import { Router } from "express";
import {
  createSubcategory,
  getSubcategories,
  updateSubcategory,
  deleteSubcategory,
} from "../contoller/subCategory.controller";

const router = Router();

router.post("/", createSubcategory);
router.get("/", getSubcategories);
router.put("/:id", updateSubcategory);
router.delete("/:id", deleteSubcategory);

export default router;
