import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: any = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "token required" });
  const bearer = token.split("Bearer ")[1];
  await jwt.verify(bearer, req.app.get("jwt-secret"), (err, decoded) => {
    if (err) return res.status(403).json({ message: "token expired" });
    req["decoded"] = decoded;
    next();
  });
};
