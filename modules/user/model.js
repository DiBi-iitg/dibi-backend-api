import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const UserSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	isVerified: { type: Boolean, default: false },
});

UserSchema.pre("save", async function (next) {
	let user = this;
	if (!user.isModified("password")) {
		return next();
	}
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hashSync(user.password, salt);
	user.password = hash;

	return next();
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
	const user = this;
	return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

UserSchema.methods.generateJWT = function () {
	var user = this;
	var token = jwt.sign({ user: user._id }, "secretsecret", {
		expiresIn: "2h",
	});
	return token;
};

UserSchema.statics.findByJWT = async function (token) {
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

const User = mongoose.model("User", UserSchema);

export default User;
