import type { UpdateUserType } from "@src/types/users/update-user-profile-type";
import type { Prisma, Role } from "@prisma/client";
import { prisma } from "@src/lib/prisma";

const baseUserSelect: Prisma.UserSelect = {
  id: true,
  username: true,
  email: true,
  role: true,
  profilePicture: true,
  createdAt: true,
};

export const userRepository = {
  create: async (data: Prisma.UserCreateInput) => {
    return prisma.user.create({
      data,
    });
  },

  findByEmail: async (email: string) => {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  },

  findById: async (id: number) => {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  },

  findByIdAndRole: async (id: number, role: Role) => {
    return prisma.user.findUnique({
      where: {
        id,
        role: role,
      },
    });
  },

  findOneUser: async (id: number, role: Role) => {
    return prisma.user.findFirst({
      where: {
        id: id,
        role: role,
      },
      select: {
        ...baseUserSelect,
        ...(role === "TECH" && {
          workHours: true,
          servicesAsTech: true,
        }),
      },
    });
  },

  findAll: async (role: Role) => {
    return prisma.user.findMany({
      where: {
        role: role,
      },
      select: {
        ...baseUserSelect,
        ...(role === "TECH" && {
          workHours: true,
          servicesAsTech: true,
        }),
      },
    });
  },

  updateUser: async (userId: number, data: UpdateUserType) => {
    return prisma.user.update({
      where: {
        id: userId,
        role: data.role,
      },
      data: {
        username: data.username,
        email: data.email,
        profilePicture: data.imageUrl,
        ...(data.role === "TECH" &&
          data.workHoursArray && {
            workHours: {
              upsert: {
                create: { workTime: data.workHoursArray },
                update: { workTime: data.workHoursArray },
              },
            },
          }),
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        profilePicture: true,
        ...(data.role === "TECH" && {
          workHours: true,
        }),
      },
    });
  },

  deleteUser: async (id: number) => {
    return prisma.user.delete({
      where: {
        id: id,
      },
    });
  },

  changePassword: async (id: number, newPassword: string) => {
    return prisma.user.update({
      where: { id },
      data: { password: newPassword },
    });
  },
};
