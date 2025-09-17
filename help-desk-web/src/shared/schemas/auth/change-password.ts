import z from "zod";

export const editPasswordSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Password need to be more than 6 characters." })
    .nonempty("Password is obligatory."),
  newPassword: z
    .string()
    .min(6, { message: "New password need to be more than 6 characters." })
    .nonempty("New password is obligatory."),
});

export type editPasswordSchemaData = z.infer<typeof editPasswordSchema>;
