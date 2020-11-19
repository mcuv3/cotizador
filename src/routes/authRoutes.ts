import { Router } from "express";

import authControllers from "../controllers/authControllers";
import signUpValidation from "../validation/signUp";
import logInValidation from "../validation/logIn";
import isValid from "../validation/is-Valid";
import isAdmin from "../middlewares/is-Admin";
import isAuth from "../middlewares/is-Auth";

const router = Router();

router.post("/login", logInValidation, isValid, authControllers.logIn);

router.post(
  "/add-seller",
  signUpValidation,
  isValid,
  isAuth,
  isAdmin,
  authControllers.addSeller
);

export default router;
