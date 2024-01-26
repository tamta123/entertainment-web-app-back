import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Token from "../models/token.js";
import crypto from "crypto"; // Import the 'crypto' module
import { sendingMail } from "../mail/index.js";

export const getAllUsers = async (_, res) => {
  try {
    const data = await User.findAll();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

// export const emptyTable = async (_, res) => {
//   try {
//     const query = "DELETE FROM users";
//     await pool.query(query);
//     return res.status(200).json({ message: "users table has been emptied" });
//   } catch (error) {
//     return res.status(500).json({ message: error });
//   }
// };

//signing a user up
//hashing users password before its saved to the database with bcrypt

export const addUser = async (req, res) => {
  try {
    const { firstName, email, password, photo, isVerified } = req.body;
    const data = {
      firstName,
      email,
      password,
      photo,
      isVerified,
    };

    //saving the user
    const user = await User.create(data);
    //if user details are captured
    //create a token with crypto.js
    if (user) {
      let setToken = await Token.create({
        userId: user.id,
        token: crypto.randomBytes(16).toString("hex"),
      });
      //if token is created, send the user an email
      if (setToken) {
        //send email to the user
        //with the function coming from the mailing.js file
        //message containing the user id and the token to help verify their email
        sendingMail({
          from: "no-reply@example.com",
          to: `${email}`,
          subject: "Account Verification Link",
          text: `Hello, ${firstName} Please verify your email by
              clicking this link :
              https://entertainment-web-app-back-production.up.railway.app/api/users/verify-email/${user.id}/${setToken.token} `,
        });
        //if token is not created, send a status of 400
      } else {
        return res.status(400).send("token not created");
      }
      console.log("user", JSON.stringify(user, null, 2));
      console.log("User ID:", user.id);
      console.log("Token:", setToken.token);
      //send user details
      return res.status(201).send(user);
    }
  } catch (error) {
    // Handle the error here
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const token = req.params.token;

    //find user by token using the where clause
    const userToken = await Token.findOne({
      token,
      where: { userId: req.params.id },
    });
    console.log(userToken);
    //if token doesn't exist, send status of 400
    if (!userToken) {
      return res.status(400).send({
        msg: "Your verification link may have expired. Please click on resend for verify your Email.",
      });
    }
    //if token exist, find the user with that token
    else {
      const user = await User.findOne({ where: { id: req.params.id } });
      if (!user) {
        console.log(user);
        return res.status(401).send({
          msg: "We were unable to find a user for this verification. Please SignUp!",
        });
      }
      //if user is already verified, tell the user to login
      else if (user.isVerified) {
        return res
          .status(200)
          .send("User has already been verified.Please Login");
      }
      //if user is not verified, change the verified to true by updating the field
      else {
        const updated = await User.update(
          {
            isVerified: true,
          },
          { where: { id: userToken.userID } }
        );
        console.log(updated);
        //if not updated send error message
        if (!updated) {
          return res.status(500).send({ msg: err.message });
        }
        //else send status of 200
        else {
          return res
            .status(200)
            .send("Your account has been successfully verified");
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

//login authentication

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //find a user by their email
    const user = await User.findOne({ email });
    console.log = user;
    //if user email is found, compare password with bcrypt
    if (user) {
      const isSame = await bcrypt.compare(password, user);
      //if password is the same, check if the user is verified,
      //if verified, generate a token and use it to set cookies for the user
      if (isSame) {
        //check if they are verified
        const verified = user.isVerified;
        if (verified) {
          let token = jwt.sign({ id: user.id }.process.env.JWT_SECRET, {
            expiresIn: 1 * 24 * 60 * 60 * 1000,
          });
          res.cookie("jwt", token, {
            maxAge: 1 * 24 * 60 * 60,
            httpOnly: true,
          });
          console.log("user", JSON.stringify(user, null, 2));
          console.log(token);
          //send user data
          return res.status(201).send(user);
        } else {
          return res.status(401).send("user not verified");
        }
      } else {
        return res.status(401).send("authentication failed");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// export const addUser = async (req, res) => {
//   try {
//     userMiddleware(req, res, async () => {
//       const { firstName, email, password, photo, isVerified } = req.body;
//       // Check if a user with the same email already exists
//       const emailCheck = await User.findOne({
//         where: {
//           email: req.body.email,
//         },
//       });

//       if (emailCheck) {
//         return res
//           .status(400)
//           .json({ message: "A user with this email already exists." });
//       }

//       const salt = await bcrypt.genSalt(10);
//       if (!password || !salt) {
//         throw new Error("Password or salt missing");
//       }
//       console.log("Generated salt:", salt);

//       const hashedPassword = await bcrypt.hash(password, salt);
//       console.log("Generated hashed password:", hashedPassword);

//       const newUser = await User.create({
//         firstName: firstName,
//         email: email,
//         password: hashedPassword,
//         photo: photo,
//         isVerified: isVerified,
//       });

//       // // Assuming sendVerificationLink is a valid function
//       // await sendVerificationLink(
//       //   email,
//       //   "https://entertainment-web-app-back-production.up.railway.app/verify"
//       // );

//       // Generate JWT token
//       const tokenData = {
//         id: newUser.id,
//         email: newUser.email,
//       };

//       const token = jwt.sign(tokenData, process.env.JWT_SECRET);

//       // Send the token along with user data in the response
//       return res.status(201).json({ user: newUser.toJSON(), token });
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal Server Error", error });
//   }
// };

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find the user by email using Sequelize
//     const user = await User.findOne({ where: { email: email } });

//     if (user) {
//       const hashedPassword = user.password;

//       // Compare passwords using bcrypt
//       const passwordsMatch = await bcrypt.compare(password, hashedPassword);

//       if (passwordsMatch) {
//         try {
//           // Generate JWT token
//           const sightData = {
//             email: user.email,
//             id: user.id,
//           };
//           const token = jwt.sign(sightData, process.env.JWT_SECRET);
//           return res.status(200).json({ ...sightData, token });
//         } catch (error) {
//           return res.status(401).json(error);
//         }
//       } else {
//         return res.status(401).json({ error: "Password is incorrect" });
//       }
//     } else {
//       return res
//         .status(401)
//         .json({ error: "User with this email does not exist" });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "ტამტა" });
//   }
// };

//sentry
