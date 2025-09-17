import { CreateTicketRequestDTO } from "@src/types/ticket";
import {
  ticketRepository,
  categoryRepository,
  categoryExists,
  createCategory,
} from "@repository/ticket-repository";
import {
  clientRepository,
  techRepository,
} from "@src/repository/user-repository";
import { prisma } from "@src/lib/prisma";

export async function ticketService(data: CreateTicketRequestDTO) {
  const {
    title,
    description,
    clientId,
    baseCategoryId,
    additionalCategoryIds = [],
  } = data;

  const categoryExists = await categoryRepository.findById(baseCategoryId);
  const clientExists = await clientRepository.findById(clientId);

  if (!categoryExists) {
    throw new Error("Category not founded!");
  }
  if (!clientExists) {
    throw new Error("Client not founded!");
  }
  const newTicket = await prisma.$transaction(async (tx) => {
    const ticket = await tx.service.create({
      data: {
        title,
        description,
        clientId,
      },
    });
    await tx.serviceCategory.create({
      data: {
        serviceId: ticket.id,
        categoryId: baseCategoryId,
        type: "BASE",
      },
    });
    if (additionalCategoryIds.length > 0) {
      const additionalData = additionalCategoryIds.map((catId) => ({
        serviceId: ticket.id,
        categoryId: catId,
        type: "ADDITIONAL" as const,
      }));

      await tx.serviceCategory.createMany({
        data: additionalData,
      });

      return ticket;
    }
  });
  return newTicket;
}

export interface ICreateCategoriesServiceInterface {
  name: string;
  basePrice: number;
}

export async function createCategoriesService({
  name,
  basePrice,
}: ICreateCategoriesServiceInterface) {
  const existsCategory = await categoryExists.findFirst(name);
  if (existsCategory) {
    throw new Error("Already exists one category with this name.");
  }

  const creatingCategory = await createCategory.create({
    name,
    basePrice,
  });

  return creatingCategory;
}
