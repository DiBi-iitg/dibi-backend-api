import ReminderService from "./services.js";
import Joi from "joi";
import validatePayload from "../../utils/validation.js";
import AppError from "../../utils/AppError.js";

const createReminder = async (req, res, next) => {
	const payloadSchema = {
		vendorId: Joi.string().required(),
		title: Joi.string().required(),
		description: Joi.string().required(),
		dueDate: Joi.number().required(),
	};

	const data = req.body;
	const valid = validatePayload(payloadSchema, data);

	if (valid.error) {
		return next(new AppError(400, valid.error));
	}

	const newReminder = await ReminderService.CreateNewReminder({
		...data,
		dueDate: new Date(data.dueDate),
	});
	return res.json(newReminder);
};

const getAllReminders = async (req, res, next) => {
	const allReminders = await ReminderService.GetAllReminders(req.user.vendorId);
	return res.json({ reminders: allReminders });
};
export default { createReminder, getAllReminders };
