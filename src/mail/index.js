import nodemailer from "nodemailer";

console.log("name", process.env.GMAIL_USER.trim());
console.log("password", process.env.GMAIL_PASSWORD);

//function to send email to the user
export const sendingMail = async ({ from, to, subject, text }) => {
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
        user: process.env.GMAIL_USER.trim(),
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

//copilot
