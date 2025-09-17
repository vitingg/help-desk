import z from "zod";

export const createTicketSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  baseCategoryId: z.string().min(1, "Categoria é obrigatória"),
});

export type createTicketSchemaData = z.infer<typeof createTicketSchema>;