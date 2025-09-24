import { Request, Response, NextFunction } from "express";
import { userServices } from "@src/services/user-service";
import { prisma } from "@src/lib/prisma";
import { cloudinary } from "@src/lib/cloudinary";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const createClient = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    let newUser = await userServices.createClientUser({
      username,
      email,
      password,
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: "Error in create user: " + error });
  }
};

export const getClients = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const clients = await prisma.user.findMany({
      where: {
        role: "CLIENT",
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
        profilePicture: true,
      },
    });
    res.status(200).json({ clients: clients });
  } catch (error) {
    console.log("Error in search clients.");
    res.status(400).json({ error: error });
  }
};

export const getOneClient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const clientId = Number(id);

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        id: clientId,
        role: "CLIENT",
      },
    });

    if (!existingUser) {
      res
        .status(400)
        .json({ message: "Doesn`t find any client with this credentials." });
    }

    const client = await prisma.user.findFirst({
      where: {
        id: clientId,
      },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        profilePicture: true,
      },
    });
    res.status(200).json({ client: client });
  } catch (error) {
    console.log("Error in search one client.");
    res.status(400).json({ error: error });
  }
};

export const putClient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { username, email } = req.body;
  const image = req.file;
  const userId = Number(id);

  if (isNaN(userId)) {
    return res.status(400).json({ message: "User Id is invalid." });
  }

  if (!username || !email) {
    res.status(400).json({ message: "Username and email are obligatory.." });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!existingUser) {
      res
        .status(400)
        .json({ message: "Doesn't exists any users with this credentials." });
    }

    const emailAlreadyTaken = await prisma.user.findFirst({
      where: {
        email: email,
        id: { not: userId },
      },
    });

    if (emailAlreadyTaken) {
      res
        .status(409)
        .json({ message: "Already exists a person with this email." });
    }

    let imageUrl = existingUser.profilePicture;
    if (image) {
      const base64Image = `data:${
        image.mimetype
      };base64,${image.buffer.toString("base64")}`;

      const result = await cloudinary.uploader.upload(base64Image, {
        folder: "client_profile_pictures",
      });

      imageUrl = result.secure_url;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        username,
        email,
        profilePicture: imageUrl,
      },
    });

    const { password: _, ...safeUser } = updatedUser;

    res.status(200).json({ message: "Update user!", user: safeUser });
  } catch (error) {
    console.log("Error in put client.", error);
    res.status(400).json({ error: error });
  }
};

export const deleteClients = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.delete({
      where: { id: Number(id) },
    });

    res.status(200).json(user);
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      res.status(404).json({ error: error });
    }
    console.log("Error in delete client.", error);
  }
};
