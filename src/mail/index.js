import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();
console.log("name", process.env.GMAIL_USER.trim());
console.log("password", process.env.GMAIL_PASSWORD);
// console.log("All environment variables:", process.env);

const gmailTransport = nodemailer.createTransport({
  // ტრანსპორტერის ფუნქციას ვქმნიტ რომელიც დააკავშირებს ნოუდ მეილერს(ჩვენს მეილს) ჯიმელითან,
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
  debug: true,
});

export default gmailTransport;

//copilot

// import nodemailer from "nodemailer"
// import { codeConfirmationTemplate } from "mail"

// export const sendCodeConfirmation = async () => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.MAIL_USER,
//       pass: process.env.MAIL_PASSWORD,
//     },
//   })
//   const mailOptions = {
//     from: <${process.env.EMAIL_FROM}>,
//     to: email,
//     subject: "MLTR Verification Code",
//     html: codeConfirmationTemplate(code),
//   }
//   transporter.sendMail(mailOptions, (err: any, info: any) => {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log(info)
//     }
//   })
// }
