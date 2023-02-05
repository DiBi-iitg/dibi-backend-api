import Joi from "joi";
import validatePayload from "../../utils/validation.js";
import AppError from "../../utils/AppError.js";

import UserServices from "../user/services.js";
import SellerServices from "../seller/services.js";
import AuthServices from "./services.js";

import User from "../user/model.js";
import Seller from "../seller/model.js";

const CreateNewUser = async (req, res, next) => {
	const payloadSchema = {
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	};

	const data = req.body;
	const valid = validatePayload(payloadSchema, data);

	if (valid.error) {
		return next(new AppError(400, valid.error));
	}

	const newUser = await UserServices.createUser(data.email, data.password);

	await AuthServices.GenerateOTP(newUser._id, newUser.email);

	return res.status(200).json({
		error: false,
		accountCreated: true,
		token: newUser._id,
	});
};

const VerifyOTP = async (req, res, next) => {
	const payloadSchema = {
		otp: Joi.number().required(),
		token: Joi.string().required(),
	};
	const data = req.body;
	const valid = validatePayload(payloadSchema, data);

	if (valid.error) {
		return next(new AppError(400, valid.error));
	}

	const access_token = await AuthServices.VerifyOTP(data.token, data.otp);
	if (!access_token) return next(new AppError(403, "Invalid OTP"));

	return res.status(200).json({ access_token });
};

const LoginUser = async (req, res, next) => {
	const payloadSchema = {
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	};

	const data = req.body;

	const valid = validatePayload(payloadSchema, data);

	if (valid.error) {
		return next(new AppError(400, valid.error));
	}

	const existingUser = await User.findOne({ email: data.email });
	if (!existingUser) return next(new AppError(403, "Invalid email or password"));

	const matched = await existingUser.comparePassword(data.password);
	if (!matched) return next(new AppError(403, "Invalid email or password"));

	if (!existingUser.isVerified) {
		await AuthServices.GenerateOTP(existingUser._id, existingUser.email);
		return res.json({
			message: "Account not verified",
			token: existingUser._id,
		});
	}

	const access_token = existingUser.generateJWT();
	return res.status(200).json({ access_token });
};

const CreateNewSeller = async (req, res, next) => {
	const payloadSchema = {
		email: Joi.string().email().required(),
		name: Joi.string().required(),
		password: Joi.string().required(),
		vendorId: Joi.string().required(),
	};

	const data = req.body;
	const valid = validatePayload(payloadSchema, data);

	if (valid.error) {
		return next(new AppError(400, valid.error));
	}

	const newUser = await SellerServices.createSeller(data);

	await AuthServices.GenerateOTP(newUser._id, newUser.email);

	return res.status(200).json({
		error: false,
		accountCreated: true,
		token: newUser._id,
	});
};

const VerifyOTPSeller = async (req, res, next) => {
	const payloadSchema = {
		otp: Joi.number().required(),
		token: Joi.string().required(),
	};
	const data = req.body;
	const valid = validatePayload(payloadSchema, data);

	if (valid.error) {
		return next(new AppError(400, valid.error));
	}

	const access_token = await AuthServices.VerifyOTPSeller(data.token, data.otp);
	if (!access_token) return next(new AppError(403, "Invalid OTP"));

	return res.status(200).json({ access_token });
};

const LoginSeller = async (req, res, next) => {
	const payloadSchema = {
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	};

	const data = req.body;

	const valid = validatePayload(payloadSchema, data);

	if (valid.error) {
		return next(new AppError(400, valid.error));
	}

	const existingUser = await Seller.findOne({ email: data.email });
	if (!existingUser) return next(new AppError(403, "Invalid email or password"));

	const matched = await existingUser.comparePassword(data.password);
	if (!matched) return next(new AppError(403, "Invalid email or password"));

	if (!existingUser.isVerified) {
		await AuthServices.GenerateOTP(existingUser._id, existingUser.email);
		return res.json({
			message: "Account not verified",
			token: existingUser._id,
		});
	}

	const access_token = existingUser.generateJWT();
	return res.status(200).json({ access_token });
};

export default {
	CreateNewUser,
	LoginUser,
	VerifyOTP,
	CreateNewSeller,
	VerifyOTPSeller,
	LoginSeller,
};
