"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authControllers_1 = __importDefault(require("../controllers/authControllers"));
const router = express_1.Router();
router.post("/login", authControllers_1.default.logIn);
router.post("/signIn", authControllers_1.default.signIn);
exports.default = router;
