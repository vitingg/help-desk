import z from "zod";

export const editUserSchema = z.object({
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
});

export type editUserSchemaData = z.infer<typeof editUserSchema>;
