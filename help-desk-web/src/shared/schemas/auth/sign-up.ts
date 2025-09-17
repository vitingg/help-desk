import z from "zod";

export const signUpSchema = z.object({
  username: z
    .string({ message: "Enter a valid username." })
    .min(4, { message: "Username need to be more than 4 characters." })
    .nonempty("Username is obligatory.")
    .transform((username) => {
      return username
        .trim()
        .split(" ")
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1));
        })
        .join(" ");
    }),
  email: z
    .email({ message: "Enter a valid email." })
    .min(5)
    .nonempty("Email is obligatory."),
  password: z
    .string()
    .min(6, { message: "Password need to be more than 6 characters." })
    .nonempty("Password is obligatory."),
});

export type signUpSchemaData = z.infer<typeof signUpSchema>;
