import { Request, Response, NextFunction } from "express";

export default (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(error);
  res
    .status(error.statusCode || 500)
    .json({ message: error.message, errors: error.payload });
};
