import { userRepository } from "../repository/user-repository";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export interface CreateUserInput {
  username?: string;
  email: string;
  password: string;
}

export interface CreateTechUserInput {
  username?: string;
  email: string;
  password: string;
  workHours: string[];
}

export const userServices = {
  createClientUser: async ({ username, email, password }: CreateUserInput) => {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("Email already in use!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    const { password: _, ...newUser } = user;

    return newUser;
  },

  createTechUser: async ({
    username,
    email,
    password,
    workHours,
  }: CreateTechUserInput) => {
    const existingUser = await userRepository.findByEmail(email);

    if (existingUser) {
      throw new Error("Email already in use!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userRepository.create({
      username,
      email,
      password: hashedPassword,
      role: "TECH",
      workHours: {
        create: {
          workTime: workHours,
        },
      },
    });

    const { password: _, ...newUser } = user;

    return newUser;
  },

  signInUser: async ({ email, password }: CreateUserInput) => {
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

  changePassword: async ({ oldPassword, newPassword, userIdFromToken }) => {
    const user = await userRepository.findById(userIdFromToken);
    if (!user) {
      throw new Error("Invalid credentials!");
    }

    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordCorrect) {
      throw new Error("Password incorrect!");
    }

    if (oldPassword === newPassword) {
      throw new Error("Cannot set old password. ");
    }

    const { password, ...newUser } = user;

    const newDatabasePassword = await bcrypt.hash(newPassword, 10);
    await userRepository.changePassword(userIdFromToken, newDatabasePassword);

    return {
      newUser,
    };
  },
};
