import AppError from "../utils/AppError.js";
import User from "../modules/user/model.js";
import Seller from "../modules/seller/model.js";

const isAuthenticated = async function (req, res, next) {
	let token = req.headers?.authorization?.split(" ")[1];
	if (!token) return next(new AppError(403, "Invalid token"));
	let user = await User.findByJWT(token);
	if (!user) user = await Seller.findByJWT(token);
	if (!user) return next(new AppError(403, "Not Authenticated"));
	req.user = user;
	return next();
};

export default isAuthenticated;
