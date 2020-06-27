import { Router } from "express";
import authControllers from "../controllers/authControllers";

const router = Router();

router.post("/login", authControllers.logIn);
router.post("/signIn", authControllers.signIn);

export default router;
