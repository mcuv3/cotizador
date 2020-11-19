import * as dotenv from "dotenv";
dotenv.config();
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ErrorClass from "../Error/errorClass";
//const SECRET_KEY = process.env.SECRET_KEY!;
const SECRET_KEY = "THIS IS A SUPER  SECRET KEY";
interface ResponseVerify {
  email: string;
  role: String;
  branch: String | null;
}

export default (req: Request, res: Response, next: NextFunction) => {
  const auth = req.get("Authorization");

  if (!auth) throw new ErrorClass(404, "NO AUTHORIZATION HEADER");

  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as ResponseVerify;
    req.user = decoded;
  } catch (e) {
    return next(e);
  }

  next();
};
