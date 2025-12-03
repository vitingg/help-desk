import { Role } from "@prisma/client";

export type UpdateUserType = {
  username: string;
  email: string;
  imageUrl?: string;
  workHoursArray?: string[];
  role: Role;
}
