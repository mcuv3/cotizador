import { Request, Response, NextFunction } from "express";
import { createJWT } from "../util/jwt";
import { compare, hash } from "bcryptjs";

import User from "../models/Users/seller";
import ErrorClass from "../Error/errorClass";

const logIn = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByEmail(email);

    if (!user)
      throw new ErrorClass(422, "User Not Found", [
        { param: "email", msg: "Contraseña o correo incorrectos" },
      ]);

    const isEqual = await compare(password, user.password);
    if (!isEqual) {
      const error = new ErrorClass(400, "INCORRECT CREDENTIALS", [
        { param: "email", msg: "Contraseña o correo incorrectos" },
      ]);
      next(error);
    }
    const role = user.role === 1 ? "admin" : "seller";
    const branch = user.branch;

    const credentials = await createJWT({ email, role, branch });
    res.status(200).json(credentials);
  } catch (e) {
    const error = new ErrorClass(e.statusCode || 500, e.message, e.payload);
    return next(error);
  }
};
const addSeller = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, name, lastname, phone, branch } = req.body;
  const hashPassword = await hash(password, 12);
  const user = new User(email, hashPassword, name, lastname, phone, branch);
  try {
    await user.save();
    return res.status(201).json({ message: "SELLER CREATED" });
  } catch (e) {
    const error = new ErrorClass(e.statusCode || 500, e.message);
    return next(error);
  }
};

export default { logIn, addSeller };
