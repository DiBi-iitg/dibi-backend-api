import { Router } from "express";
import isAuthenticated from "../../middleware/isAuthenticated.js";
import SellerController from "./controller.js";
import catchAsync from "../../utils/catchAsync.js";
const router = Router();

router.get("/", isAuthenticated, catchAsync(SellerController.getSeller));

export default router;
