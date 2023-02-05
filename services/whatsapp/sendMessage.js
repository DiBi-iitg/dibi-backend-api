const SendWhatsAppMessage = async (client, number, text) => {
	const sanitized_number = number.toString().replace(/[- )(]/g, "");
	const final_number = `91${sanitized_number.substring(sanitized_number.length - 10)}`;

	const number_details = await client.getNumberId(final_number); // get mobile number details

	if (number_details) {
		const sendMessageData = await client.sendMessage(number_details._serialized, text);
	} else {
		console.log(final_number, "Mobile number is not registered");
	}
};
export default SendWhatsAppMessage;
