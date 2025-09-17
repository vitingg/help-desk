import z from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(4),
  basePrice: z.number(),
});

export type createCategorySchemaData = z.infer<typeof createCategorySchema>;
