import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();
console.log("name", process.env.MAIL_USER);
console.log("password", process.env.MAIL_PASSWORD);

const mailTransport = nodemailer.createTransport({
  // ტრანსპორტერის ფუნქციას ვქმნიტ რომელიც დააკავშირებს ნოუდ მეილერს(ჩვენს მეილს) ჯიმელითან,
  host: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
  debug: true,
});

export default mailTransport;

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
