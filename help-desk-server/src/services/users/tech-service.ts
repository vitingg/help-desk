import type { CreateTechInputType } from "@src/types/users/create-tech-input-type";
import type { UpdateUserType } from "@src/types/users/update-user-profile-type";
import { userRepository } from "@src/repository/user-repository";
import bcrypt from "bcrypt";

export const techService = {
  create: async ({
    username,
    email,
    password,
    workHours,
  }: CreateTechInputType) => {
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

  getAllTechs: async () => {
    const techs = await userRepository.findAll("TECH");
    return techs;
  },

  getOneTech: async ({ id }) => {
    const tech = await userRepository.findOneUser(id, "TECH");
    return tech;
  },

  verifyUniqueTechById: async ({ id }) => {
    const verifying = await userRepository.findByIdAndRole(id, "TECH");
    return verifying;
  },

  updateTech: async (userId: number, data: UpdateUserType) => {
    const updateUser = await userRepository.updateUser(userId, data);
    return updateUser;
  },

  deleteTech: async ({ id }) => {
    const deletedTech = await userRepository.deleteUser(id);
    return deletedTech;
  },
};
