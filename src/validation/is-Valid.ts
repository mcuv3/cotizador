import { validationResult } from "express-validator";
import { Request, Response } from "express";
import ErrorClass from "../Error/errorClass";

export default (req: Request, res: Response, next: CallableFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    throw new ErrorClass(422, "VALIDATION ERROR", errors.array());
  next();
};
