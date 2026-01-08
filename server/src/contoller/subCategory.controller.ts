import { Request, Response } from "express";
import mongoose from "mongoose";
import Subcategory from "../models/SubCategory.model";

export const createSubcategory = async (req: Request, res: Response) => {
  try {
    const subcategory = await Subcategory.create(req.body);
    return res.status(201).json(subcategory);
  } catch (error: any) {
    console.error("Create subcategory error:", error);

    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Subcategory name already exists" });
    }

    if (error instanceof mongoose.Error.ValidationError) {
      const messages = Object.values(error.errors).map(
        (err: any) => err.message
      );
      return res.status(400).json({
        message: messages.join(", "),
      });
    }

    return res.status(500).json({ message: "Failed to create subcategory" });
  }
};

export const getSubcategories = async (_req: Request, res: Response) => {
  try {
    const subcategories = await Subcategory.find().populate("category");
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch subcategories" });
  }
};

export const updateSubcategory = async (req: Request, res: Response) => {
  try {
    const subcategory = await Subcategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    return res.json(subcategory);
  } catch (error: any) {
    console.error("Update subcategory error:", error);

    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Subcategory name already exists" });
    }

    if (error instanceof mongoose.Error.ValidationError) {
      const messages = Object.values(error.errors).map(
        (err: any) => err.message
      );
      return res.status(400).json({
        message: messages.join(", "),
      });
    }

    return res.status(500).json({ message: "Failed to update subcategory" });
  }
};

export const deleteSubcategory = async (req: Request, res: Response) => {
  try {
    const subcategory = await Subcategory.findByIdAndDelete(req.params.id);

    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    return res.json({ message: "Subcategory deleted successfully" });
  } catch (error) {
    console.error("Delete subcategory error:", error);
    return res.status(500).json({ message: "Failed to delete subcategory" });
  }
};
