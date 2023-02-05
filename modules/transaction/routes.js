import { Router } from "express";
import catchAsync from "../../utils/catchAsync.js";
import TxnController from "./controller.js";
const router = Router();

// get seller specific transactions
router.post("/all", catchAsync(TxnController.GetAllTxns));

// create a new transaction
router.post("/", catchAsync(TxnController.CreateNewTxn));

export default router;
