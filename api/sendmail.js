const sgMail = require("@sendgrid/mail");
const fs = require("fs");
const { SENDGRID_API_KEY, TEST_SEND_EMAIL } = require("./config");

sgMail.setApiKey(SENDGRID_API_KEY);

const message = {
  to: TEST_SEND_EMAIL,
  from: "hi@1newsletter.tech",
  subject: "Weekly Newsletter | 1Newsletter",
  text: "Your weekly newsletter from 1Newsletter",
  html: fs.readFileSync("template.html", { encoding: "utf-8" }),
};

sgMail
  .send(message)
  .then(() => {
    console.log("Email sent");
  })
  .catch((error) => {
    console.error(error);
  });
