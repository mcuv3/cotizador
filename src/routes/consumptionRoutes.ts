import { Router } from "express";
import * as consumptionControllers from "../controllers/consumptionControllers";

const router = Router();

router.get("/:quotationId", consumptionControllers.getConsumptions);

router.put("/edit/:quotationId", consumptionControllers.editConsumptions);

export default router;
