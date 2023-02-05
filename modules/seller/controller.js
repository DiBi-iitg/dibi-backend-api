import AppError from "../../utils/AppError.js";
import SellerServices from "./services.js";

const getSeller = async (req, res, next) => {
	const seller = await SellerServices.GetSeller(req.user.vendorId);
	if (!seller) return next(new AppError(400, "Invalid vendor id"));
	return res.json(seller);
};
export default { getSeller };
