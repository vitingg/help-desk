import type z from "zod";
import type { signUpSchema } from "../../schemas/auth/sign-up";

export type signUpSchemaData = z.infer<typeof signUpSchema>;
