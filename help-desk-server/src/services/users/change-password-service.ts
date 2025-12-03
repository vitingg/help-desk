import type { changePasswordType } from "@src/types/users/change-password-type";
import { userRepository } from "@src/repository/user-repository";
import bcrypt from "bcrypt";

export const changePasswordService = {
  changePassword: async ({
    oldPassword,
    newPassword,
    userIdFromToken,
  }: changePasswordType) => {
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
