import { Request, Response, NextFunction } from "express";
import ErrorClass from "../Error/errorClass";

export default (req: Request, res: Response, next: NextFunction) => {
  const { role } = req.user;
  if (role !== "admin") throw new ErrorClass(401, "ACCESS DENIED");
  next();
};
