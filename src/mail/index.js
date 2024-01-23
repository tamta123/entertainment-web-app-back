// import dotenv from "dotenv";
import nodemailer from "nodemailer";

console.log("name", process.env.GMAIL_USER.trim());
console.log("password", process.env.GMAIL_PASSWORD);

//function to send email to the user
module.exports.sendingMail = async ({ from, to, subject, text }) => {
  try {
    let mailOptions = {
      from,
      to,
      subject,
      text,
    };
    //assign createTransport method in nodemailer to a variable
    //service: to determine which email platform to use
    //auth contains the senders email and password which are all saved in the .env

    const Transporter = nodemailer.createTransport({
      // ტრანსპორტერის ფუნქციას ვქმნიტ რომელიც დააკავშირებს ნოუდ მეილერს(ჩვენს მეილს) ჯიმელითან,
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
      debug: true,
    });
    //return the Transporter variable which has the sendMail method to send the mail
    //which is within the mailOptions
    return await Transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};

// dotenv.config();

// // console.log("All environment variables:", process.env);

// const gmailTransport = nodemailer.createTransport({
//   // ტრანსპორტერის ფუნქციას ვქმნიტ რომელიც დააკავშირებს ნოუდ მეილერს(ჩვენს მეილს) ჯიმელითან,
//   service: "gmail",
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_PASSWORD,
//   },
//   debug: true,
// });

// export default gmailTransport;

// //copilot

// // import nodemailer from "nodemailer"
// // import { codeConfirmationTemplate } from "mail"

// // export const sendCodeConfirmation = async () => {
// //   const transporter = nodemailer.createTransport({
// //     service: "gmail",
// //     auth: {
// //       user: process.env.MAIL_USER,
// //       pass: process.env.MAIL_PASSWORD,
// //     },
// //   })
// //   const mailOptions = {
// //     from: <${process.env.EMAIL_FROM}>,
// //     to: email,
// //     subject: "MLTR Verification Code",
// //     html: codeConfirmationTemplate(code),
// //   }
// //   transporter.sendMail(mailOptions, (err: any, info: any) => {
// //     if (err) {
// //       console.log(err)
// //     } else {
// //       console.log(info)
// //     }
// //   })
// // }
