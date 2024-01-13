import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendVerificationLink } from "../mail/edge.js";
import User from "../models/user.js";
import userMiddleware from "../middlewares/user-middleware.js";

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

export const addUser = async (req, res) => {
  try {
    userMiddleware(req, res, async () => {
      const { firstName, email, password, photo, isVerified } = req.body;
      // Check if a user with the same email already exists
      const emailCheck = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (emailCheck) {
        return res
          .status(400)
          .json({ message: "A user with this email already exists." });
      }

      const salt = await bcrypt.genSalt(10);
      if (!password || !salt) {
        throw new Error("Password or salt missing");
      }
      console.log("Generated salt:", salt);

      const hashedPassword = await bcrypt.hash(password, salt);
      console.log("Generated hashed password:", hashedPassword);

      const newUser = await User.create({
        firstName: firstName,
        email: email,
        password: hashedPassword,
        photo: photo,
        isVerified: isVerified,
      });

      // // Assuming sendVerificationLink is a valid function
      // await sendVerificationLink(
      //   email,
      //   "https://entertainment-web-app-back-production.up.railway.app/verify"
      // );

      // Generate JWT token
      const tokenData = {
        id: newUser.id,
        email: newUser.email,
      };

      const token = jwt.sign(tokenData, process.env.JWT_SECRET);

      // Send the token along with user data in the response
      return res.status(201).json({ user: newUser.toJSON(), token });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email using Sequelize
    const user = await User.findOne({ where: { email: email } });

    if (user) {
      const hashedPassword = user.password;

      // Compare passwords using bcrypt
      const passwordsMatch = await bcrypt.compare(password, hashedPassword);

      if (passwordsMatch) {
        try {
          // Generate JWT token
          const sightData = {
            email: user.email,
            id: user.id,
          };
          const token = jwt.sign(sightData, process.env.JWT_SECRET);
          return res.status(200).json({ ...sightData, token });
        } catch (error) {
          return res.status(401).json(error);
        }
      } else {
        return res.status(401).json({ error: "Password is incorrect" });
      }
    } else {
      return res
        .status(401)
        .json({ error: "User with this email does not exist" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "ტამტა" });
  }
};

//sentry
