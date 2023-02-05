import pkg from "whatsapp-web.js";
const { Client, LegacySessionAuth } = pkg;
import qrcode from "qrcode-terminal";
import fs from "fs";

const client = new Client();
client.on("qr", (qr) => {
	qrcode.generate(qr, { small: true });
});

client.on("authenticated", (session) => {
	console.log("WhatsApp Authenticated");
});

client.on("ready", () => {
	console.log("WhatsApp Client is ready!");
});

export default client;
