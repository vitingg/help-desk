import type { Prisma } from "@prisma/client";
import { prisma } from "@src/lib/prisma";
import { ICreateCategoriesServiceInterface } from "@src/services/ticket-service";

export const ticketRepository = {
  create: async (data: Prisma.ServiceCreateInput) => {
    return prisma.service.create({
      data,
      include: {
        client: {
          select: {
            id: true,
            username: true,
          },
        },
        tech: {
          select: {
            id: true,
            username: true,
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
      },
    });
  },
};

export const categoryRepository = {
  findById: async (id: number) => {
    return prisma.category.findUnique({
      where: { id },
    });
  },
};

export const categoryExists = {
  findFirst: async (name: string) => {
    return prisma.category.findFirst({
      where: { name },
    });
  },
};

export const createCategory = {
  create: async (data: ICreateCategoriesServiceInterface) => {
    return prisma.category.create({
      data: data,
    });
  },
};
