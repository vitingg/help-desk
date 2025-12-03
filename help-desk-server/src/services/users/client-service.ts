import type { CreateClientInputType } from "@src/types/users/create-client-input-type";
import type { UpdateUserType } from "@src/types/users/update-user-profile-type";
import { userRepository } from "@src/repository/user-repository";
import bcrypt from "bcrypt";

export const clientService = {
  create: async ({ username, email, password }: CreateClientInputType) => {
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

  getAllClients: async () => {
    const clients = await userRepository.findAll("CLIENT");
    return clients;
  },

  getOneClient: async ({ id }) => {
    const client = await userRepository.findOneUser(id, "CLIENT");
    return client;
  },

  updateClient: async (userId: number, data: UpdateUserType) => {
    const updateUser = await userRepository.updateUser(userId, data);
    return updateUser;
  },

  deleteClient: async ({ id }) => {
    const deletedClient = await userRepository.deleteUser(id);
    return deletedClient;
  },
};
