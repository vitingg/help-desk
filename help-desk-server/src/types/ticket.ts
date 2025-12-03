import { ServiceStatus } from "@prisma/client";

export interface CreateTicketRequestDTO {
  title: string;
  description?: string;
  baseCategoryId: number;
  clientId: number;
  additionalCategoryIds?: number[];
}

export interface CreateTicketDto {
  title: string;
  description: string;
  clientId: number;
  baseCategoryId: number;
  additionalCategoryIds?: number[];
}

export interface UpdateTicketStatusDto {
  status: ServiceStatus;
}

export interface AssignTechDto {
  techId: number;
}
