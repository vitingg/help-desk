import { authService } from "@src/services/users/auth-service";
import { Request, Response } from "express";

export const signInController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await authService.signInUser({ email, password });
    const { token, newUser } = result;

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json(newUser);
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(401).json({ message: "Invalid credentials." });
  }
};

export const signOutController = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", { path: "/" });
    res.status(200).json({ message: "Logout done." });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error in sign-out" });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const id = req.user!.userId;
    const user = await authService.searchId(id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    const { password, ...userData } = user;
    res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching current user:", error);
    res.status(400).json({
      message: "Error on fetching current user",
      error: error.message,
    });
  }
};
