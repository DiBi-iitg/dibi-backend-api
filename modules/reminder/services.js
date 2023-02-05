import Reminder from "./model.js";

const CreateNewReminder = async (data) => {
	const newReminder = await Reminder.create(data);
	return newReminder;
};

const GetAllReminders = async (vendorId) => {
	const reminders = await Reminder.find({ vendorId: vendorId }).select("-__v");
	return reminders;
};

export default { CreateNewReminder, GetAllReminders };
