import { Edge } from "edge.js";
import path, { join } from "path";
import gmailTransport from "./index.js";
import dotenv from "dotenv";

dotenv.config();

const edge = new Edge({ cache: false });
const templatesPath = join(path.resolve(), "src/mail/templates");
edge.mount(templatesPath);

const send = (to, subject, html) => {
  const options = {
    to,
    subject,
    html,
    from: process.env.GMAIL_USER,
  };

  return gmailTransport.sendMail(options);
};

export const sendVerificationLink = async (to, name, link) => {
  const html = edge.renderSync("verify.edge", {
    name,
    link,
  });

  return send(to, "Verify email", html);
};
