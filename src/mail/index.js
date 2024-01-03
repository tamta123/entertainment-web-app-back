import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();
console.log("name", process.env.GMAIL_USER);
console.log("password", process.env.GMAIL_PASSWORD);

const gmailTransport = nodemailer.createTransport({
  // ტრანსპორტერის ფუნქციას ვქმნიტ რომელიც დააკავშირებს ნოუდ მეილერს(ჩვენს მეილს) ჯიმელითან,
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
  debug: true, // Enable debugging
});

export default gmailTransport;
