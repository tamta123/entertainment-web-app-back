import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();
console.log("name", process.env.MAIL_USER);
console.log("password", process.env.MAIL_PASSWORD);

const mailTransport = nodemailer.createTransport({
  // ტრანსპორტერის ფუნქციას ვქმნიტ რომელიც დააკავშირებს ნოუდ მეილერს(ჩვენს მეილს) ჯიმელითან,
  host: "smtp.mail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
    // user: "tamtag186@gmail.com",
    // pass: "thke ofvh qsjp lzai",
  },
  debug: true, // Enable debugging
});

export default mailTransport;

//copilot
