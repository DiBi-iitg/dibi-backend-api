import Transaction from "./model.js";
import Seller from "../seller/model.js";
import AppError from "../../utils/AppError.js";
const CreateTransaction = async (data) => {
	const newTxn = await Transaction.create({ ...data });
	return newTxn;
};
export default { CreateTransaction };
