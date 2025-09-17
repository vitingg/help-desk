import type z from "zod";
import type { signInSchema } from "../../schemas/auth/sign-in";

export type signInSchemaData = z.infer<typeof signInSchema>;
