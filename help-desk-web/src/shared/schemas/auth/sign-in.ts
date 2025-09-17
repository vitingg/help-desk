import z from "zod";

export const signInSchema = z.object({
  email: z.string().email({ message: "Enter a valid email." }),
  password: z
    .string()
    .min(6, { message: "Password need to be more than 6 characters." }),
});

export type signInSchemaData = z.infer<typeof signInSchema>;