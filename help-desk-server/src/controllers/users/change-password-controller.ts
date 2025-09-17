import { Request, Response } from "express";
import { userServices } from "@src/services/user-service";

export async function changePasswordController(req: Request, res: Response) {
  const { oldPassword, newPassword } = req.body;
  const userIdFromToken = req.user?.userId;

  if (!oldPassword || !newPassword) {
    res.status(400).json({ message: "Invalid Credentials" });
  }

  if (!userIdFromToken) {
    res.status(400).json({ message: "No users informed!" });
  }

  try {
    const user = await userServices.changePassword({
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
