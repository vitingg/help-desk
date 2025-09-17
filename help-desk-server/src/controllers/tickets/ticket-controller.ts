import { Request, Response } from "express";
import { ticketService } from "@src/services/ticket-service";
import { CreateTicketRequestDTO } from "@src/types/ticket";
import { prisma } from "@src/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function createTicket(req: Request, res: Response) {
  const {
    title,
    description,
    baseCategoryId,
    clientId,
    additionalCategoryIds,
  } = req.body as CreateTicketRequestDTO;

  if (!title || !description || !clientId || !baseCategoryId) {
    res.status(400).json({
      error:
        "All required fields (title, description, baseCategoryId, clientId) must be provided.",
    });
  }

  try {
    const ticket = await ticketService({
      title,
      description,
      baseCategoryId,
      additionalCategoryIds,
      clientId,
    });

    res.status(201).json(ticket);
  } catch (error) {
    console.log("Error in create ticket", error);
    return res.status(400).json({
      message: error?.message || "Unknown error in ticket creation.",
    });
  }
}

export async function getTickets(req: Request, res: Response) {
  try {
    const tickets = await prisma.service.findMany({
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
            category: {
              include: {
                services: true,
              },
            },
          },
        },
      },
    });
    res.status(200).json({ tickets: tickets });
  } catch (error) {
    console.log("Error in find services.");
    res.status(400).json({ error: error });
  }
}

export async function getTicketsById(req: Request, res: Response) {
  const { id } = req.params;
  const ticketId = Number(id);

  try {
    const existingTicket = await prisma.service.findUnique({
      where: {
        id: ticketId,
      },
    });

    if (!existingTicket) {
      res
        .status(400)
        .json({ message: "Doesn't exists any category with this Id." });
    }

    const tickets = await prisma.service.findUnique({
      where: {
        id: ticketId,
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
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
            email: true,
          },
        },
      },
    });
    res.status(200).json({ tickets: tickets });
  } catch (error) {
    console.log("Error in find services.");
    res.status(400).json({ error: error });
  }
}

export async function patchTicketAddTech(req: Request, res: Response) {
  const { id } = req.params;
  const { techId } = req.body;
  const ticketId = Number(id);

  try {
    const existingService = await prisma.service.findUnique({
      where: {
        id: ticketId,
      },
    });

    if (!existingService) {
      throw new Error("Fail on search for service!");
    }

    const ticket = await prisma.service.update({
      where: {
        id: ticketId,
      },
      data: {
        techId: techId,
        status: "IN_PROGRESS",
      },
    });
    res.status(200).json(ticket);
  } catch (error) {
    console.error("Fail on change activities:", error);
    res.status(400).json({ error: "Error in change activities." });
  }
}

export async function patchTicketStatus(req: Request, res: Response) {
  const { id } = req.params;
  const { status } = req.body;
  const ticketId = Number(id);

  try {
    const existingService = await prisma.service.findUnique({
      where: {
        id: ticketId,
      },
    });

    if (!existingService) {
      throw new Error("Fail on search for service!");
    }

    const ticket = await prisma.service.update({
      where: {
        id: ticketId,
      },
      data: {
        status: status,
      },
    });
    res.status(200).json(ticket);
  } catch (error) {
    console.error("Fail on change activities:", error);
    res.status(400).json({ error: "Error in change activities." });
  }
}

export async function patchTicketAdditionalCategory(
  req: Request,
  res: Response
) {
  const { id } = req.params;
  const { additionalCategoryIds } = req.body as {
    additionalCategoryIds: number[];
  };
  const ticketId = Number(id);

  if (!Array.isArray(additionalCategoryIds)) {
    return res
      .status(400)
      .json({ error: "AdditionalCategoryIds must be an array." });
  }

  try {
    const existingService = await prisma.service.findUnique({
      where: {
        id: ticketId,
      },
    });

    if (!existingService) {
      throw new Error("Fail on search for service!");
    }

    const existingRelations = await prisma.serviceCategory.findMany({
      where: { serviceId: ticketId, categoryId: { in: additionalCategoryIds } },
    });

    const newIds = additionalCategoryIds.filter(
      (id) => !existingRelations.some((rel) => rel.categoryId === id)
    );

    const ticket = await prisma.service.update({
      where: { id: ticketId },
      data: {
        categories: {
          create: additionalCategoryIds.map((categoryId) => ({
            categoryId,
            type: "ADDITIONAL",
          })),
        },
      },
      include: {
        categories: {
          include: { category: true },
        },
      },
    });
    res.status(200).json(ticket);
  } catch (error) {
    console.error("Fail on change activities:", error);
    res.status(400).json({ error: "Error in change activities." });
  }
}

export async function deleteTickets(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const tickets = await prisma.service.delete({ where: { id: Number(id) } });
    res.status(200).json({ message: "Deleted successfully." });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      res.status(404).json({ error: "Service not found!" });
    }
    console.log("Error in delete service.", error);
  }
}
