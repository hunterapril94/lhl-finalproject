const Vonage = require("@vonage/server-sdk");

require("dotenv").config();

const voageNumber = process.env.VOYAGE_NUMBER;
const toNumber = process.env.TO_NUMBER;
const sendText = (from, to, text) => {
  const vonage = new Vonage({
    apiKey: process.env.VOYAGE_API_KEY,
    apiSecret: process.env.VOYAGE_API_SECRET,
  });

  vonage.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
      console.log(err);
    } else {
      if (responseData.messages[0]["status"] === "0") {
        console.log("Message sent successfully.");
      } else {
        console.log(
          `Message failed with error: ${responseData.messages[0]["error-text"]}`
        );
      }
    }
  });
};

// sendText(voageNumber, toNumber, "testing From voyage");

module.export = { sendText };
