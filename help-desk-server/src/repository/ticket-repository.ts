import type { ServiceStatus } from "@prisma/client";
import { prisma } from "@src/lib/prisma";
import { CreateTicketDto } from "@src/types/ticket";

const ticketInclude = {
  client: {
    select: { id: true, username: true, email: true },
  },
  tech: {
    select: { id: true, username: true, email: true },
  },
  categories: {
    include: {
      category: true,
    },
  },
};

export const ticketRepository = {
  findAll: async () => {
    return prisma.service.findMany({
      include: ticketInclude,
      orderBy: { createdAt: "desc" },
    });
  },

  findById: async (id: number) => {
    return prisma.service.findUnique({
      where: { id },
      include: ticketInclude,
    });
  },

  create: async (data: CreateTicketDto) => {
    return prisma.service.create({
      data: {
        title: data.title,
        description: data.description,
        clientId: data.clientId,
        categories: {
          create: [
            { categoryId: data.baseCategoryId, type: "BASE" },
            ...(data.additionalCategoryIds || []).map((catId) => ({
              categoryId: catId,
              type: "ADDITIONAL" as const,
            })),
          ],
        },
      },
      include: ticketInclude,
    });
  },

  updateStatus: async (id: number, status: ServiceStatus) => {
    return prisma.service.update({
      where: { id },
      data: { status },
      include: ticketInclude,
    });
  },

  assignTech: async (id: number, techId: number) => {
    return prisma.service.update({
      where: { id },
      data: {
        techId,
        status: "IN_PROGRESS",
      },
      include: ticketInclude,
    });
  },

  findCategoriesByServiceId: async (serviceId: number) => {
    return prisma.serviceCategory.findMany({
      where: { serviceId },
    });
  },

  addCategories: async (id: number, categoryIds: number[]) => {
    return prisma.service.update({
      where: { id },
      data: {
        categories: {
          create: categoryIds.map((catId) => ({
            categoryId: catId,
            type: "ADDITIONAL",
          })),
        },
      },
      include: ticketInclude,
    });
  },

  delete: async (id: number) => {
    return prisma.service.delete({
      where: { id },
    });
  },
};
