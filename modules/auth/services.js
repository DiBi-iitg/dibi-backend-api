import SendEmail from "../../utils/SendEmail.js";
import User from "../user/model.js";
import Seller from "../seller/model.js";
import OTP from "./model.js";

const GenerateOTP = async (userId, userEmail) => {
	const existingOTP = await OTP.findOne({ userId: userId });
	if (existingOTP) {
		await OTP.deleteMany({ userId: userId });
	}
	var otp = Math.floor(100000 + Math.random() * 9000);
	const newOTP = await OTP.create({
		otp: otp,
		userId: userId,
	});
	// Send email
	SendEmail(userEmail, otp);
};

const VerifyOTP = async (userId, candidateOTP) => {
	try {
		const existingOTP = await OTP.findOne({ userId: userId });

		if (!existingOTP) return false;
		if (existingOTP.otp !== candidateOTP) return false;

		await OTP.deleteMany({ userId: userId });
		const user = await User.findByIdAndUpdate(userId, { isVerified: true });
		const access_token = user.generateJWT();

		if (!user) return false;
		return access_token;
	} catch (error) {
		return false;
	}
};

const VerifyOTPSeller = async (userId, candidateOTP) => {
	try {
		const existingOTP = await OTP.findOne({ userId: userId });

		if (!existingOTP) return false;
		if (existingOTP.otp !== candidateOTP) return false;

		await OTP.deleteMany({ userId: userId });
		const user = await Seller.findByIdAndUpdate(userId, { isVerified: true });
		const access_token = user.generateJWT();

		if (!user) return false;
		return access_token;
	} catch (error) {
		return false;
	}
};

export default { GenerateOTP, VerifyOTP, VerifyOTPSeller };
