import User from "./model.js";

const createUser = async (email, password) => {
	const newUser = await User.create({ email, password });
	return newUser;
};

export default { createUser };
