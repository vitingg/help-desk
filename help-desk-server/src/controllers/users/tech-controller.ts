import type { UpdateUserType } from "@src/types/users/update-user-profile-type";
import { techService } from "@src/services/users/tech-service";
import { Request, Response, NextFunction } from "express";
import { cloudinary } from "@src/lib/cloudinary";

export const createTech = async (req: Request, res: Response) => {
  try {
    const { username, email, password, workHours } = req.body;

    const newUser = await techService.create({
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
    const techs = await techService.getAllTechs();
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
    const tech = await techService.getOneTech({ id: techId });
    res.status(200).json({ techs: tech });
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
    return res
      .status(400)
      .json({ message: "Inform your username or email correctly!" });
  }

  let workHoursArray = [];
  try {
    workHoursArray =
      typeof workHours === "string" ? JSON.parse(workHours) : workHours;
  } catch (error) {
    return res.status(400).json({ message: "Invalid workHours format" });
  }

  try {
    const existingUser = await techService.verifyUniqueTechById({ id: userId });
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "Doesn't exists any techs with this credentials." });
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

    const updatedData: UpdateUserType = {
      username,
      email,
      workHoursArray,
      imageUrl,
      role: "TECH",
    };
    const updateTech = await techService.updateTech(userId, updatedData);

    res.status(200).json(updateTech);
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
    const user = techService.deleteTech({ id });
    res.status(200).json({ user });
  } catch (error) {
    console.log("Error in delete tech.", error);
    res.status(400).json(error);
  }
};
