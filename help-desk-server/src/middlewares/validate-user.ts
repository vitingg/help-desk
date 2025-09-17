import { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";

export const validateUser =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        res.status(400).json({
          message: "Error!",
          error: error.format(),
        });
        return;
      }
    }
  };
