import bcrypt from "bcrypt";

export const comparePassword = async (candidatePassword, hashedPassword) => {
	try {
		const match = await bcrypt.compare(candidatePassword, hashedPassword);
		if (!match) {
			return false;
		}
		return true;
	} catch (error) {
		return false;
	}
};
