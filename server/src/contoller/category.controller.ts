import { Request, Response } from "express";
import mongoose from "mongoose";
import Category from "../models/Category.model";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.create(req.body);
    return res.status(201).json(category);
  } catch (error: any) {
    console.error("Create category error:", error);

    // Duplicate name error
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Category name already exists" });
    }

    // Validation errors
    if (error instanceof mongoose.Error.ValidationError) {
      const messages = Object.values(error.errors).map(
        (err: any) => err.message
      );
      return res.status(400).json({
        message: messages.join(", "),
      });
    }

    return res.status(500).json({ message: "Failed to create category" });
  }
};

export const getCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Failed to update category" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete category" });
  }
};
