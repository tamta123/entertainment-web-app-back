import express from "express";
import User from "../models/user.js";

// Function to check if username or email already exists in the database
// This is to avoid having two users with the same username and email

const saveUser = async (req, res, next) => {
  try {
    // Search the database to see if the username already exists
    const userNameExist = await User.findOne({
      where: {
        firstName: req.body.firstName,
      },
    });
    // If username exists in the database, respond with a status of 409
    if (userNameExist) {
      return res.status(409).send("Username already taken");
    }
    // Checking if the email already exists
    const emailExist = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    // If email exists in the database, respond with a status of 409
    if (emailExist) {
      return res.status(409).send("email already taken");
    }
    // Continue to the next middleware or route handler if everything is okay
    next();
  } catch (error) {
    console.error(error);
    // Handle other errors or respond with an appropriate status code
    res.status(500).send("Internal Server Error");
  }
};

export default saveUser;

// const userMiddleware = (request, response, next) => {
//   const { authorization } = request.headers;
//   if (!authorization) {
//     response.status(403).send();
//   } else {
//     const [, token] = authorization.trim().split(" ");

//     try {
//       const verified = jwt.verify(token, process.env.JWT_SECRET);
//       if (verified) {
//         next();
//       } else {
//         response.status(403).send();
//       }
//     } catch (error) {
//       response.status(403).send();
//     }
//   }
// };
