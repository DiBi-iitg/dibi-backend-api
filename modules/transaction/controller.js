import Joi from "joi";
import validatePayload from "../../utils/validation.js";
import AppError from "../../utils/AppError.js";

import Transaction from "../transaction/model.js";
import TxnServices from "./services.js";

import WhatsAppClient from "../../services/whatsapp/client.js";
import SendWhatsAppMessage from "../../services/whatsapp/sendMessage.js";

const categories = ["electronics", "grocery", "raw material", "accessories", "service"];
const getRandomCategory = () => categories[Math.floor(Math.random() * categories.length)];

const GetAllTxns = async (req, res, next) => {
	const payloadSchema = {
		vendorId: Joi.string().required(),
	};

	const data = req.body;
	const valid = validatePayload(payloadSchema, data);

	if (valid.error) {
		return next(new AppError(400, valid.error));
	}

	const allTxns = await Transaction.find({ vendorId: data.vendorId });
	return res.json({
		vendorId: data.vendorId,
		txns: allTxns,
	});
};

const CreateNewTxn = async (req, res, next) => {
	const txnSchema = {
		id: Joi.string().required(),
		itemName: Joi.string().required(),
		itemQty: Joi.string().required(),
		itemPrice: Joi.string().required(),
		itemTotal: Joi.string().required(),
	};
	const payloadSchema = {
		vendorId: Joi.string().required(),
		invoiceNumber: Joi.string().required(),
		consumerDetail: Joi.string().required(),
		txns: Joi.array().items(txnSchema).required(),
		totalAmount: Joi.string().required(),
	};

	const data = req.body;
	const valid = validatePayload(payloadSchema, data);

	if (valid.error) {
		return next(new AppError(400, valid.error));
	}
	const newTxn = await TxnServices.CreateTransaction({
		...data,
		category: getRandomCategory(),
	});
	SendWhatsAppMessage(
		WhatsAppClient,
		"",
		`
	New Transaction
	Invoice Number ${newTxn.invoiceNumber}
	Seller ID ${newTxn.vendorId}
	Total Amount ${newTxn.totalAmount}
	Thanks!
	DiBi Bot
	`
	);
	return res.json(newTxn);
};

export default {
	GetAllTxns,
	CreateNewTxn,
};
