const Vonage = require("@vonage/server-sdk");

require("dotenv").config();

const sendText = (from, to, text) => {
  const vonage = new Vonage({
    apiKey: process.env.VOYAGE_API_KEY,
    apiSecret: process.env.VOYAGE_API_SECRET,
  });
  // const from = process.env.VOYAGE_NUMBER;
  // const from = "18339223665";
  // const to = "12064584774";
  // const text = "A text message sent using the Vonage SMS API";
  console.log(
    process.env.VOYAGE_API_KEY,
    process.env.VOYAGE_API_SECRET,
    process.env.DB_HOST
  );

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

sendText(18339223665, 12064584774, "testing From voyage");

module.export = { sendText };
