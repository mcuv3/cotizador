import { check } from "express-validator";

export default [
  check("email", "Contraseña o correo incorrectos")
    .isEmail()
    .normalizeEmail()
    .trim(),
  check("password").not().isEmpty().trim(),
];
