import { Router } from "express";
import * as adminControllers from "../controllers/componentsControllers";
import isAdmin from "../middlewares/is-Admin";

const router = Router();

router.get("/components", adminControllers.getAllComponents);

router.post("/component-add", isAdmin, adminControllers.addComponent);

router.put("/component-update", isAdmin, adminControllers.updateComponent);

router.delete(
  "/:component_kind/:id",
  isAdmin,
  adminControllers.deleteComponent
);

export default router;
