import mongoose, { mongo } from "mongoose";

const TxnSchema = mongoose.Schema({
	vendorId: { type: String, required: true },
	consumerDetail: { type: String },
	invoiceNumber: { type: String, required: true },
	totalAmount: { type: String, required: true },
	category: { type: String },
	txns: [
		{
			id: String,
			itemName: String,
			itemQty: String,
			itemPrice: String,
			itemTotal: String,
		},
	],
});

const Transaction = mongoose.model("Transaction", TxnSchema);
export default Transaction;
