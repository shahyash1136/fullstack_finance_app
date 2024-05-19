import { Router } from "express";
import { getUser } from "../controllers/userController.js";
import { authMiddleware } from "../utils/authMiddleware.js";

const router = Router();

router.route("/").get(authMiddleware, getUser);

export default router;
