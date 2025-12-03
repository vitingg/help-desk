import type { CreateClientInputType } from "@src/types/users/create-client-input-type";
import { userRepository } from "@src/repository/user-repository";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const authService = {
  signInUser: async ({ email, password }: CreateClientInputType) => {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Invalid credentials!");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new Error("Invalid credentials!");
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.AUTH_SECRET!,
      { expiresIn: "3d" }
    );

    const { password: _, ...newUser } = user;

    return {
      token,
      newUser,
    };
  },

  searchId: async (id: number) => {
    const user = await userRepository.findById(id);
    return user;
  },
};
