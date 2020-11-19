import { check } from "express-validator";
import User from "../models/Users/seller";

export default [
  check("email", "Ingresa un email valido")
    .trim()
    .isEmail()
    .normalizeEmail()
    .trim()
    .custom(async (email: string, { req }) => {
      return User.findByEmail(email).then((user) => {
        if (user) return Promise.reject("El usuario ya existe.");
      });
    }),
  check("password", "Ingresa una contraseña valida")
    .trim()
    .isLength({ min: 8 })
    .isAlphanumeric(),
  check("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password)
      throw new Error("Las contraseñas deben de coincidir");
    return true;
  }),
  check("name", "Campo requerido").trim().not().isEmpty(),
  check("lastname", "Campo requerido").trim().not().isEmpty(),
  check("phone", "Debe ser un número telefónico")
    .trim()
    .isMobilePhone(["es-MX"]),
  check("branch", "Elige una sucursal").trim().isNumeric(),
];
