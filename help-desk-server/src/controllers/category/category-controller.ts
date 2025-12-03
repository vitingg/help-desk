import { categoryService } from "@src/services/category/category-service";
import { Request, Response } from "express";

export const createCategory = async (req: Request, res: Response) => {
  const { name, basePrice } = req.body;

  if (!name || basePrice === undefined) {
    return res
      .status(400)
      .json({ message: "Name and basePrice are required." });
  }

  try {
    const category = await categoryService.create({ name, basePrice });
    return res.status(201).json(category);
  } catch (error: any) {
    if (error.message === "Category name already exists") {
      return res.status(409).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryService.getAll(true);
    return res.status(200).json({ categories });
  } catch (error) {
    return res.status(500).json({ error: "Error searching categories" });
  }
};

export const clientGetCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryService.getAll(false);
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ error: "Error searching categories" });
  }
};

export const getOneCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const category = await categoryService.getById(Number(id));
    return res.status(200).json(category);
  } catch (error: any) {
    return res.status(404).json({ message: "Category not found" });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, basePrice } = req.body;

  try {
    const category = await categoryService.update(Number(id), {
      name,
      basePrice,
    });
    return res.status(200).json(category);
  } catch (error: any) {
    if (error.message === "Category not found") {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const toggleCategoryStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const category = await categoryService.toggleStatus(Number(id));
    return res.status(200).json(category);
  } catch (error: any) {
    return res.status(404).json({ message: "Category not found" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await categoryService.delete(Number(id));
    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: "Error deleting category" });
  }
};
