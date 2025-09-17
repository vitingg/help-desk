export interface CreateTicketRequestDTO {
  title: string;
  description?: string;
  baseCategoryId: number;
  clientId: number;
  additionalCategoryIds?: number[]
}