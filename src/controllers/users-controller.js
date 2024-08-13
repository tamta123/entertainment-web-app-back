import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Token from "../models/token.js";
import { sendingMail } from "../mail/index.js";
import BookMark from "../models/bookMark.js";
import Movie from "../models/movie.js";
import { where } from "sequelize";

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
// }

//register new user to the database

export const addUser = async (req, res) => {
  try {
    const { firstName, email, password, photo, isVerified } = req.body;
    const data = {
      firstName,
      email,
      password: await bcrypt.hash(password, 10),
      photo,
      isVerified,
    };

    //saving the user
    const user = await User.create(data);
    //if user details are captured
    //create a token with crypto.js
    if (user) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      console.log("user", JSON.stringify(user, null, 2));
      console.log("User ID:", user.id);
      console.log("Token:", token);

      // Save the token in your Token table
      await Token.create({
        userId: user.id,
        token: token,
      });

      //if token is created, send the user an email
      if (token) {
        //send email to the user
        //with the function coming from the mailing.js file
        //message containing the user id and the token to help verify their email
        sendingMail({
          from: "no-reply@example.com",
          to: `${email}`,
          subject: "Account Verification Link",
          text: `Hello, ${firstName} Please verify your email by clicking this link :
              https://entertainment-web-app-back-production.up.railway.app/api/users/verify-email/${user.id}/${token} `,
        });
        //if token is not created, send a status of 400
      } else {
        return res.status(400).send("token not created");
      }
      console.log("token დააგენერირა", token);
      //send user details
      return res.status(201).json({ ...user.toJSON() });
    }
  } catch (error) {
    // Handle the error here
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

//verifying the email of the user
export const verifyEmail = async (req, res) => {
  try {
    const token = req.params.token;

    //find user by token using the where clause
    const userToken = await Token.findOne({
      token,
      where: {
        userId: req.params.id,
      },
    });
    console.log(userToken);
    //if token doesn't exist, send status of 400
    if (!userToken) {
      return res.status(400).send({
        msg: "Your verification link may have expired. Please click on resend for verify your Email.",
      });

      //if token exist, find the user with that token
    } else {
      const user = await User.findOne({ where: { id: req.params.id } });
      if (!user) {
        console.log(user);

        return res.status(401).send({
          msg: "We were unable to find a user for this verification. Please SignUp!",
        });

        //if user is already verified, tell the user to login
      } else if (user.isVerified) {
        return res.status(200).send({
          message: "User has been already verified. Please Login",
          token: token,
        });

        //if user is not verified, change the verified to true by updating the field
      } else {
        const updated = await User.update(
          { isVerified: true },
          {
            where: {
              id: userToken.userId,
            },
          }
        );
        console.log(updated);

        //if not updated send error message
        if (!updated) {
          return res.status(500).send({ msg: err.message });
          //else send status of 200
        } else {
          return res.status(200).send({
            message: "Your account has been successfully verified",
            token: newToken,
          });
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
    const user = await User.findOne({
      where: { email },
      // include: [{ model: Movie, through: { model: BookMark, attributes: [] } }],
    });
    //if user email is found, compare password with bcrypt
    if (user) {
      const isSame = await bcrypt.compare(password, user.password);
      console.log("password", user.password);
      //if password is the same, check if the user is verified,
      //if verified, generate a token
      if (isSame) {
        //check if they are verified
        const verified = user.isVerified;
        if (verified) {
          let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            algorithm: "HS256",
            expiresIn: "1d",
          });
          console.log("jwt", process.env.JWT_SECRET);
          // Set the Authorization header and send user data
          res.setHeader("Authorization", token);

          console.log("user", JSON.stringify(user, null, 2));
          console.log(token);

          return res.status(200).json({
            ...user.toJSON(),
            token: token,
            // bookmarks: user.Movies,
          });
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

export const getBookmarks = async (req, res) => {
  try {
    const userId = req.user.id;
    const userWithBookmarks = await User.findOne({
      where: { id: userId },
      include: [
        {
          model: Movie,
          through: { model: BookMark, attributes: [] },
          as: "bookmarkedMovies",
        },
      ],
    });
    if (!userWithBookmarks) {
      return res.status(400).json({ error: "User not found" });
    }
    const bookmarks = userWithBookmarks.bookmarkedMovies; // Use correct alias
    res.status(200).json(bookmarks);
  } catch (error) {
    console.error("Error fetching bookmarks", error);
    res.status(500).json({ error: "Failed to fetch bookmarks" });
  }
};

// Function to bookmark a movie for a user
export const bookmarkMovie = async (req, res) => {
  try {
    // Extract user ID from the JWT token in the request headers
    // Extract the movie ID from the request body

    const userId = req.user.id;
    const { movieId } = req.body;

    console.log("Received userId:", userId);
    console.log("Received movieId:", movieId);

    const existingBookmark = await BookMark.findOne({
      where: { userId, movieId },
    });

    if (existingBookmark) {
      return res.status(400).json({ message: "Movie already bookmarked" });
    }

    await BookMark.create({
      userId,
      movieId,
    });

    console.log(BookMark.associations);

    // Fetch the updated list of bookmarks for the user
    const bookmarks = await BookMark.findAll({
      where: { userId },
      as: "bookmarkedMovies", // Ensure this matches the alias defined in associations
    });

    console.log("bookmarks....", bookmarks);
    // Send the updated list of bookmarks in the response
    return res
      .status(200)
      .json({ message: "Movie bookmarked successfully", bookmarks });
  } catch (error) {
    console.error("error bookmarking movie", error);
    return res.status(500).json({ error: "failed to bookmark a movie" });
  }
};

export const deleteBookmarkedMovie = async (req, res) => {
  try {
    const userId = req.user.id;
    const { movieId } = req.params;

    console.log("userId", userId);
    console.log("movieId", movieId);

    const bookMark = await BookMark.findOne({ where: { userId, movieId } });
    if (!bookMark) {
      return res.status(404).json({ message: "bookmark not found" });
    }
    await bookMark.destroy();
    return res.status(200).json({ message: "bookmark removed successfully" });
  } catch (error) {
    console.error("Error deleting bookmark", error);
    return res.status(500).json({ error: "Failed to remove bookmark" });
  }
};

export const fetchUser = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "No user information found" });
    }
    const userId = req.user.id; // Access user ID from req.user
    // Fetch user details from the database
    const user = await User.findOne({
      where: { id: userId },
      include: [{ model: Movie, through: { model: BookMark, attributes: [] } }],
    });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    return res.status(200).json({ ...user.toJSON(), bookmarks: user.Movies });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
};
