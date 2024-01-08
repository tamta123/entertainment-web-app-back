import { Edge } from "edge.js";
import path, { join } from "path";
import mailTransport from "./index.js";
import dotenv from "dotenv";

dotenv.config();

const edge = new Edge({ cache: false });
const templatesPath = join(path.resolve(), "src/mail/templates");
edge.mount(templatesPath);

const send = async (to, subject, html) => {
  const options = {
    to,
    subject,
    html,
    from: process.env.MAIL_USER,
  };

  // try {
  //   const response = await gmailTransport.sendMail(options);
  //   console.log("Mail sent successfully:", response);
  // } catch (error) {
  //   console.error("Error sending mail:", error);
  //   // Optionally rethrow the error if needed
  //   throw error;
  // }
  return mailTransport.sendMail(options);
};

export const sendVerificationLink = async (to, name, link) => {
  const html = edge.renderSync("verify", {
    name,
    link,
  });

  return send(to, "Verify email", html);
};
