import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IClient {
  sub: string;
}

export default function requireAuthentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const [, token] = authHeader.split(" ");

  const { sub } = verify(
    token,
    "estaehumastringaleatoriaparaachavedotoken"
  ) as IClient;

  req.user_id = sub;

  return next();
}
