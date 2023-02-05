import mongoose from "mongoose";

const ReminderSchema = mongoose.Schema(
	{
		vendorId: { type: String, required: true },
		title: { type: String, required: true },
		description: { type: String, required: true },
		dueDate: { type: Date },
	},
	{ timestamps: true }
);

const Reminder = mongoose.model("Reminder", ReminderSchema);

export default Reminder;
