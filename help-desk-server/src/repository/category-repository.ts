import { CreateCategoryType } from "src/types/categories/create-category-type";
import { UpdateCategoryType } from "src/types/categories/update-category-type";
import { prisma } from "@src/lib/prisma";

export const categoryRepository = {
  findAll: async (onlyActive: boolean = false) => {
    return prisma.category.findMany({
      where: onlyActive ? { isActive: true } : undefined,
      orderBy: { name: "asc" },
    });
  },

  findById: async (id: number) => {
    return prisma.category.findUnique({
      where: { id },
    });
  },

  findByName: async (name: string) => {
    return prisma.category.findFirst({
      where: { name },
    });
  },

  create: async (data: CreateCategoryType) => {
    return prisma.category.create({
      data,
    });
  },

  update: async (id: number, data: UpdateCategoryType) => {
    return prisma.category.update({
      where: { id },
      data,
    });
  },

  toggleStatus: async (id: number, newStatus: boolean) => {
    return prisma.category.update({
      where: { id },
      data: { isActive: newStatus },
    });
  },

  delete: async (id: number) => {
    return prisma.category.delete({
      where: { id },
    });
  },
};
