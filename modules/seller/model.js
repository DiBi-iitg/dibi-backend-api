import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SellerSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	vendorId: {
		type: String,
		required: true,
	},
	isVerified: { type: Boolean, default: false },
});

SellerSchema.pre("save", async function (next) {
	let user = this;
	if (!user.isModified("password")) {
		return next();
	}
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hashSync(user.password, salt);
	user.password = hash;

	return next();
});

SellerSchema.methods.comparePassword = async function (candidatePassword) {
	const user = this;
	return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

SellerSchema.methods.generateJWT = function () {
	var user = this;
	var token = jwt.sign({ user: user._id }, "secretsecret", {
		expiresIn: "2h",
	});
	return token;
};

SellerSchema.statics.findByJWT = async function (token) {
	try {
		var user = this;
		var decoded = jwt.verify(token, "secretsecret");
		const id = decoded.user;
		const fetchedUser = user.findOne({ _id: id });
		if (!fetchedUser) return false;
		return fetchedUser;
	} catch (error) {
		return false;
	}
};

const User = mongoose.model("Seller", SellerSchema);

export default User;
