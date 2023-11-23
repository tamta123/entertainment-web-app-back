import pool from "../database/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendVerificationLink } from "../mail/edge.js";
import User from "../models/user.js";

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

export const addUSer = async (req, res) => {
  try {
    const { firstName, email, password, photo } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt); // bcrypt ნიშნავს შემიქმენი ჰაში ამ პაროლისთვის სალთის მიხედვით

    const newUser = await User.create({
      firstName: firstName,
      email: email,
      password: hashedPassword,
      photo: photo,
    });

    // await sendVerificationLink(
    //   email,
    //   "https://entertainment-web-app-back-production.up.railway.app/verify" //ასეთი როუთი გვექნება ფრონტში რეაქტზე (ვერცელის)
    // );
    console.log(newUser.toJSON());
    return res.status(201).json(newUser.toJSON());
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const query = `
//       SELECT * FROM users
//       WHERE email = $1;
//     `;

//     const result = await pool.query(query, [email]);

//     if (result.rows.length === 1) {
//       const user = result.rows[0];
//       const hashedPassword = user.password;

//       const passwordsMatch = await bcrypt.compare(password, hashedPassword);

//       if (passwordsMatch) {
//         try {
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
//         return res.status(401).json("Password is incorrect");
//       }
//     } else {
//       return res.status(401).json("User with this email does not exist");
//     }
//   } catch (error) {
//     return res.status(500).json({ message: error });
//   }
// };

//შევქმნი მოდელის ფოლდერს, იუზერები და რელაცია მაგატ შორის

//davamato sequalize da davamato useris modeli. modelebis migracia rac nishnavs rom databaaseshi sheqmnas is magalitad useris table da apishi user endpoint chavanacvlo

//user model : email name password photo, ეს უნდა გავაკეთო სექუალაიზში,
//movies: titles, poster, year,
// movie - categories: trending, recommended for you, tv series
