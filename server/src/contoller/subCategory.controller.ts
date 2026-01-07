import { Request, Response } from "express";
import Subcategory from "../models/SubCategory.model";

export const createSubcategory = async (req: Request, res: Response) => {
  try {
    const subcategory = await Subcategory.create(req.body);
    res.status(201).json(subcategory);
  } catch (error) {
    res.status(500).json({ message: "Failed to create subcategory" });
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
      { new: true }
    );
    res.json(subcategory);
  } catch (error) {
    res.status(500).json({ message: "Failed to update subcategory" });
  }
};

export const deleteSubcategory = async (req: Request, res: Response) => {
  try {
    await Subcategory.findByIdAndDelete(req.params.id);
    res.json({ message: "Subcategory deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete subcategory" });
  }
};
