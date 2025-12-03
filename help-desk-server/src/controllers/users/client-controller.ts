import type { UpdateUserType } from "@src/types/users/update-user-profile-type";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { clientService } from "@src/services/users/client-service";
import { Request, Response, NextFunction } from "express";
import { cloudinary } from "@src/lib/cloudinary";

export const createClient = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await clientService.create({
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
    const clients = await clientService.getAllClients();
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
    const client = await clientService.getOneClient({ id: clientId });
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
    return res
      .status(400)
      .json({ message: "Username and email are obligatory.." });
  }

  try {
    const existingUser = await clientService.getOneClient({ id: userId });
    if (!existingUser) {
      res
        .status(400)
        .json({ message: "Doesn't exists any users with this credentials." });
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

    const data: UpdateUserType = {
      username,
      email,
      role: "CLIENT",
      imageUrl,
    };
    const updateClient = await clientService.updateClient(userId, data);

    res.status(200).json({ message: "Update user!", user: updateClient });
  } catch (error) {
    console.log("Error in put client.", error);
    res.status(400).json({ error: error });
  }
};

export const deleteClients = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = clientService.deleteClient({ id });
    res.status(200).json({ message: "Deleted successfully" });
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
