import Seller from "./model.js";

const createSeller = async (data) => {
	const newUser = await Seller.create({ ...data });
	return newUser;
};

const GetSeller = async (vendorId) => {
	const seller = await Seller.findOne({ vendorId }).select("-password -__v -_id -isVerified");
	return seller;
};

export default { createSeller, GetSeller };
