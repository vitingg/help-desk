import { Request, Response, NextFunction } from "express";
import { userServices } from "@src/services/user-service";
import { prisma } from "@src/lib/prisma";
import { cloudinary } from "@src/lib/cloudinary";

export const createTech = async (req: Request, res: Response) => {
  try {
    const { username, email, password, workHours } = req.body;

    const newUser = await userServices.createTechUser({
      username,
      email,
      password,
      workHours,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.log("Error in create tech");
    res.status(400).json({ error: "Error in tech controller" + error });
  }
};

export const getTechs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const techs = await prisma.user.findMany({
      where: {
        role: "TECH",
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
        profilePicture: true,
        workHours: true,
        servicesAsTech: true,
        servicesAsClient: true,
      },
    });
    res.status(200).json({ techs: techs });
  } catch (error) {
    console.log("Error in search techs.");
    res.status(500).json({ error: error });
  }
};

export const getOneTech = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const techId = Number(id);

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        id: techId,
        role: "TECH",
      },
    });

    if (!existingUser) {
      res
        .status(400)
        .json({ message: "Doesn`t exists any tech with this id." });
    }

    const techs = await prisma.user.findUnique({
      where: {
        id: techId,
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
        profilePicture: true,
        workHours: true,
        servicesAsTech: true,
        servicesAsClient: true,
      },
    });
    res.status(200).json({ techs: techs });
  } catch (error) {
    console.log("Error in get one tech.");
    res.status(500).json({ error: error });
  }
};

export const putTech = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { username, email, workHours } = req.body;
  const image = req.file;
  const userId = Number(id);

  if (!username || !email) {
    res
      .status(400)
      .json({ message: "Inform your username or email correctly!" });
  }

  const workHoursArray =
    typeof workHours === "string" ? JSON.parse(workHours) : workHours;

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!existingUser) {
      res
        .status(400)
        .json({ message: "Doesn't exists any techs with this credentials." });
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
        folder: "tech_profile_pictures",
      });
      imageUrl = result.secure_url;
    }

    const user = await prisma.user.update({
      where: {
        id: userId,
        role: "TECH",
      },
      data: {
        username: username,
        email: email,
        workHours: {
          update: {
            workTime: workHoursArray,
          },
        },
        profilePicture: imageUrl,
      },
    });

    const { password, ...safeUser } = user;

    res.status(200).json(safeUser);
  } catch (error) {
    console.log("Error in update tech.", error);
    res.status(400).json({ error: error });
  }
};

export const deleteTech = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({ user });
  } catch (error) {
    console.log("Error in delete tech.", error);
    res.status(400).json(error);
  }
};
