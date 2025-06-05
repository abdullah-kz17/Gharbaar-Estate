// config/sendSms.js
const twilio = require("twilio");

const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

const sendSms = async (to, message) => {
    try {
        const formattedPhone = to.startsWith("+") ? to : `+92${to.replace(/^0/, "")}`;
        await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: formattedPhone
        });
        console.log("SMS sent to", formattedPhone);
    } catch (error) {
        console.error("SMS sending failed:", error.message);
        throw error;
    }
};

module.exports = sendSms;
