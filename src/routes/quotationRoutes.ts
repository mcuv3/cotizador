import { Router } from "express";
import {
  sendQuotation,
  slimQuotation,
  addQuotation,
  getQuotations,
  assignQuotation,
  cancelQuotation,
  getQuotationsSlim,
  getQuotation,
  getCalculations,
  saveComponents,
  downloadQuotation,
} from "../controllers/quotationControllers";
import { postCalculationConsumptions } from "../controllers/calculationControllers";
import validate from "../validation/quotation";
import isValid from "../validation/is-Valid";
import quotationValidation from "../validation/userdata";
import isAuth from "../middlewares/is-Auth";
import { addConsumptions } from "../controllers/consumptionControllers";

const router = Router();

router.get("/:quotationId", isAuth, getQuotation, getCalculations);

router.patch("/calculation", isAuth, getCalculations);

router.put("/quotations/slim", isAuth, getQuotationsSlim);

router.put("/quotations/edit/:quotationId", isAuth);

router.get("/quotations/:admin/:grp", isAuth, getQuotations);

router.patch("/save-components", isAuth, getCalculations, saveComponents);

router.post("/send", isAuth, getCalculations, saveComponents, sendQuotation);

router.get("/download/:quotationId", isAuth, downloadQuotation);

router.post(
  "/add-quotation",
  quotationValidation,
  isValid,
  addQuotation,
  addConsumptions
);

router.post(
  "/quotation-slim",
  validate,
  isValid,
  postCalculationConsumptions,
  slimQuotation,
  getCalculations
);

router.put("/assign/:quotationId", isAuth, assignQuotation);

router.put("/assign-cancel/:quotationId", isAuth, cancelQuotation);

router.get("/:quotationId");
export default router;
