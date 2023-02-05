import { Client, LegacySessionAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import fs from "fs";

const SESSION_FILE_PATH = "./session.json";

let sessionData;
if (fs.existsSync(SESSION_FILE_PATH)) {
	sessionData = require(SESSION_FILE_PATH);
}

const client = new Client({
	authStrategy: new LegacySessionAuth({
		session: sessionData,
	}),
});

client.on("qr", (qr) => {
	qrcode.generate(qr, { small: true });
});

client.on("authenticated", (session) => {
	sessionData = session;
	fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
		if (err) {
			console.error(err);
		}
	});
});

client.on("ready", () => {
	console.log("Client is ready!");
});

export default client;
