import express from "express";
import register from "../Controllers/registerController.js";

const router = express.Router();

router.post("/", register);

export default router;
