import nodemailer from "nodemailer";
import emailClient from "../config/emailClient.js";

const SendEmail = (to, otp) => {
	const transporter = nodemailer.createTransport({
		service: "outlook",
		auth: {
			user: emailClient.email,
			pass: emailClient.password,
		},
	});
	const options = {
		from: emailClient.email,
		to: to,
		subject: "Verify your DiBi account",
		text: "Your OTP is " + otp,
	};
	transporter.sendMail(options, function (err, info) {
		if (err) {
			console.log(err);
			return;
		}
		console.log("Sent", info.response);
	});
};

export default SendEmail;
