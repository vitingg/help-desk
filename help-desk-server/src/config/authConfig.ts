export const authConfig = {
  jwt: {
    secret: process.env.AUTH_SECRET || "default",
    expiresIn: "3d",
  },
};
