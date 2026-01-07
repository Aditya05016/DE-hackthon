import { Router } from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../contoller/product.controller";
import authMiddleware from "../middleware/authmiddleware";

const router = Router();

router.post("/", authMiddleware, createProduct);
router.get("/", getProducts);
router.put("/:id", authMiddleware, updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);

export default router;
