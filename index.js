import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();

import WhatsappClient from "./services/whatsapp/client.js";
WhatsappClient.initialize();

import userRoutes from "./modules/auth/routes.js";
import txnRoutes from "./modules/transaction/routes.js";
import sellerRoutes from "./modules/seller/routes.js";
import reminderRoutes from "./modules/reminder/routes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", userRoutes);
app.use("/api/transaction", txnRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/reminders", reminderRoutes);

app.use((err, req, res, next) => {
	console.log(err.message);
	const { status = 500, message = "Something went wrong!" } = err;
	return res.status(status).json({
		error: true,
		message: message,
	});
});

mongoose.set("strictQuery", false);
mongoose
	.connect(process.env.MONGO_URI, {})
	.then(() => {
		console.log("Database connected.");
		const PORT = process.env.PORT || 8000;
		app.listen(PORT, () => console.log("Listening on port", PORT));
	})
	.catch((e) => console.log(e));
