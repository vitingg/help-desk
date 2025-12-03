import { CreateCategoryType } from "@src/types/categories/create-category-type";
import { UpdateCategoryType } from "@src/types/categories/update-category-type";
import { categoryRepository } from "@src/repository/category-repository";

export const categoryService = {
  getAll: async (isAdmin: boolean) => {
    return await categoryRepository.findAll(!isAdmin);
  },

  getById: async (id: number) => {
    const category = await categoryRepository.findById(id);
    if (!category) throw new Error("Category not found");
    return category;
  },

  create: async (data: CreateCategoryType) => {
    const exists = await categoryRepository.findByName(data.name);
    if (exists) {
      throw new Error("Category name already exists");
    }
    return await categoryRepository.create(data);
  },

  update: async (id: number, data: UpdateCategoryType) => {
    const exists = await categoryRepository.findById(id);
    if (!exists) throw new Error("Category not found");

    return await categoryRepository.update(id, data);
  },

  toggleStatus: async (id: number) => {
    const category = await categoryRepository.findById(id);
    if (!category) throw new Error("Category not found");

    return await categoryRepository.toggleStatus(id, !category.isActive);
  },

  delete: async (id: number) => {
    try {
      return await categoryRepository.delete(id);
    } catch (error) {
      throw new Error("Category not found or cannot be deleted");
    }
  },
};
