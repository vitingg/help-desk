// src/services/ticket.service.ts
import { ticketRepository } from "@src/repository/ticket-repository";
import { userRepository } from "@src/repository/user-repository";
import { categoryRepository } from "@src/repository/category-repository";
import { CreateTicketDto } from "@src/types/ticket";

export const ticketService = {
  getAll: async () => {
    return await ticketRepository.findAll();
  },

  getById: async (id: number) => {
    const ticket = await ticketRepository.findById(id);
    if (!ticket) throw new Error("Ticket not found");
    return ticket;
  },

  create: async (data: CreateTicketDto) => {
    const client = await userRepository.findByIdAndRole(
      data.clientId,
      "CLIENT"
    );
    if (!client) throw new Error("Client not found");

    const category = await categoryRepository.findById(data.baseCategoryId);
    if (!category) throw new Error("Base Category not found");

    return await ticketRepository.create(data);
  },

  assignTech: async (ticketId: number, techId: number) => {
    const ticket = await ticketRepository.findById(ticketId);
    if (!ticket) throw new Error("Ticket not found");

    const tech = await userRepository.findByIdAndRole(techId, "TECH");
    if (!tech) throw new Error("Tech not found");

    return await ticketRepository.assignTech(ticketId, techId);
  },

  updateStatus: async (ticketId: number, status: any) => {
    const ticket = await ticketRepository.findById(ticketId);
    if (!ticket) throw new Error("Ticket not found");

    return await ticketRepository.updateStatus(ticketId, status);
  },

  addAdditionalCategories: async (ticketId: number, categoryIds: number[]) => {
    const ticket = await ticketRepository.findById(ticketId);
    if (!ticket) throw new Error("Ticket not found");

    const existingRelations = await ticketRepository.findCategoriesByServiceId(
      ticketId
    );

    const newIds = categoryIds.filter(
      (id) => !existingRelations.some((rel) => rel.categoryId === id)
    );

    if (newIds.length === 0) {
      return ticket;
    }

    return await ticketRepository.addCategories(ticketId, newIds);
  },

  delete: async (id: number) => {
    const ticket = await ticketRepository.findById(id);
    if (!ticket) throw new Error("Ticket not found");

    return await ticketRepository.delete(id);
  },
};
