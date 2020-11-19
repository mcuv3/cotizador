import { Router } from "express";
import * as calculationControllers from "../controllers/calculationControllers";
const router = Router();

router.post(
  "/consumptions",
  calculationControllers.postCalculationConsumptions
);

export default router;
