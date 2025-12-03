import type { changePasswordType } from "@src/types/users/change-password-type";
import { changePasswordService } from "@src/services/users/change-password-service";
import { Request, Response } from "express";

type ChangePasswordBody = Omit<changePasswordType, "userIdFromToken">;

export async function changePasswordController(
  req: Request<{}, {}, ChangePasswordBody>,
  res: Response
) {
  const { oldPassword, newPassword } = req.body;
  const userIdFromToken = req.user?.userId;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }

  if (!userIdFromToken) {
    return res.status(400).json({ message: "No users informed!" });
  }

  try {
    const user = await changePasswordService.changePassword({
      oldPassword,
      newPassword,
      userIdFromToken,
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error in change password", error });
  }
}
