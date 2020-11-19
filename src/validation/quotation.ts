import { check } from "express-validator";

export default [
  check("consumption", "No valido").trim().isFloat({ min: 150 }),
  // check("consumo").trim().not().isEmpty(),
  // check("unidadConsumo", "Selecciona una unidad de consumo.")
  //   .trim()
  //   .not()
  //   .isEmpty(),
  // check("cantidadConsumo", "Ingresa una cantidad valida.")
  //   .trim()
  //   .isFloat({ min: 5.0, max: 6000.0 }),
  // check("periodo", "Selecciona el periodo de consumo.").trim().not().isEmpty(),
  // check("mesesFinanciamiento", "Ingresa una opción valida.")
  //   .trim()
  //   .isFloat({ min: 1.0, max: 15.0 }),
];
