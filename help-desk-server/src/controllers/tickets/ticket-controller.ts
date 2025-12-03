import { Request, Response } from "express";
import { ticketService } from "@src/services/ticket/ticket-service";
import { ServiceStatus } from "@prisma/client";

export const createTicket = async (req: Request, res: Response) => {
  const {
    title,
    description,
    baseCategoryId,
    clientId,
    additionalCategoryIds,
  } = req.body;

  if (!title || !description || !clientId || !baseCategoryId) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    const ticket = await ticketService.create({
      title,
      description,
      clientId: Number(clientId),
      baseCategoryId: Number(baseCategoryId),
      additionalCategoryIds: additionalCategoryIds || [],
    });
    return res.status(201).json(ticket);
  } catch (error: any) {
    if (
      error.message === "Client not found" ||
      error.message === "Base Category not found"
    ) {
      return res.status(404).json({ message: error.message });
    }
    console.error(error);
    return res.status(500).json({ message: "Error creating ticket" });
  }
};

export const getTickets = async (req: Request, res: Response) => {
  try {
    const tickets = await ticketService.getAll();
    return res.status(200).json({ tickets });
  } catch (error) {
    return res.status(500).json({ error: "Error fetching tickets" });
  }
};

export const getTicketById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const ticket = await ticketService.getById(Number(id));
    return res.status(200).json({ ticket });
  } catch (error: any) {
    return res.status(404).json({ message: "Ticket not found" });
  }
};

export const patchAssignTech = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { techId } = req.body;

  if (!techId) return res.status(400).json({ message: "Tech ID required" });

  try {
    const ticket = await ticketService.assignTech(Number(id), Number(techId));
    return res.status(200).json(ticket);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const patchTicketStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!Object.values(ServiceStatus).includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const ticket = await ticketService.updateStatus(Number(id), status);
    return res.status(200).json(ticket);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const patchAddCategories = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { additionalCategoryIds } = req.body;

  if (!Array.isArray(additionalCategoryIds)) {
    return res.status(400).json({ message: "Ids must be an array" });
  }

  try {
    const ticket = await ticketService.addAdditionalCategories(
      Number(id),
      additionalCategoryIds
    );
    return res.status(200).json(ticket);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const deleteTicket = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await ticketService.delete(Number(id));
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
