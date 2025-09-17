import { Request, Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
  userId: number;
  role: string;
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
        role: string;
      };
    }
  }
}

export const authorize = (allowedRoles?: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Access denied. Without token." });
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.AUTH_SECRET!
      ) as TokenPayload;

      req.user = { userId: decoded.userId, role: decoded.role };

      if (allowedRoles && !allowedRoles.includes(decoded.role)) {
        return res
          .status(403)
          .json({ message: "Forbidden: Insufficient permissions." });
      }
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "Invalid or expired Token." });
    }
  };
};
