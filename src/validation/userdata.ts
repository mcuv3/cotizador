import { check } from "express-validator";

export default [
  check("email", "Ingresa un email valido")
    .trim()
    .isEmail()
    .normalizeEmail()
    .trim(),
  check("name", "Su nombre es requerido").trim().not().isEmpty(),
  check("phone", "Debe ser un número telefónico")
    .trim()
    .isMobilePhone(["es-MX"]),
];
