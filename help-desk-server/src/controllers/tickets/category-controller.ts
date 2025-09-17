import { Request, Response } from "express";
import { prisma } from "@src/lib/prisma";
import { createCategoriesService } from "@src/services/ticket-service";

export const createCategories = async (req: Request, res: Response) => {
  const { name, basePrice } = req.body;
  if (!name || !basePrice) {
    res.status(400).json({ message: "Missing arguments." });
  }

  try {
    const createCategories = await createCategoriesService({
      name,
      basePrice,
    });
    res.status(201).json(createCategories);
  } catch (error) {
    console.log("Error in create categories.", error);
    res.status(400).json({ message: "Error in create category." });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json({ category: categories });
  } catch (error) {
    console.error("Error on search all categories:", error);
    res.status(400).json({ error: "Error on search all categories." });
  }
};

export const getOneCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const categoryId = Number(id);
  try {
    const categories = await prisma.category.findFirst({
      where: {
        id: categoryId,
      },
    });
    res.status(200).json({ category: categories });
  } catch (error) {
    console.error("Error on search one category:", error);
    res.status(400).json({ error: "Error on search one category." });
  }
};

export const clientGetCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      where: {
        isActive: true,
      },
    });
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error on client get categories:", error);
    res.status(400).json({ error: "Error on search client get categories." });
  }
};

export const patchToggleActivities = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const existingCategory = await prisma.category.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingCategory) {
      res.status(400).json({ message: "Fail on search for category!" });
    }

    const categories = await prisma.category.update({
      where: {
        id: Number(id),
      },
      data: {
        isActive: !existingCategory.isActive,
      },
    });
    res.status(200).json(categories);
  } catch (error) {
    console.error("Fail on change activities:", error);
    res.status(400).json({ error: "Error in change activities." });
  }
};

export const putChangeNameOrPrice = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, basePrice } = req.body;
  const userId = Number(id);
  try {
    const existingCategory = await prisma.category.findUnique({
      where: {
        id: userId,
      },
    });

    if (!existingCategory) {
      throw new Error("Fail on search for category!");
    }

    const categories = await prisma.category.update({
      where: {
        id: userId,
      },
      data: {
        name: name,
        basePrice: basePrice,
      },
    });
    res.status(200).json(categories);
  } catch (error) {
    console.error("Fail on change activities:", error);
    res.status(400).json({ error: "Error in change activities." });
  }
};

export const deleteCategories = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await prisma.category.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
