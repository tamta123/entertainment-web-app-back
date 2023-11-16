import pool from "../database/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendVerificationLink } from "../mail/edge.js";
import { validateUser } from "../validator.js";
import pkg from "joi";
const { link } = pkg;

export const getAllUsers = async (_, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");

    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const emptyTable = async (_, res) => {
  try {
    const query = "DELETE FROM users";
    await pool.query(query);
    return res.status(200).json({ message: "users table has been emptied" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const addUSer = async (req, res) => {
  try {
    const { email, password, photo, bookmarks } = req.body;
    const { error } = validateUser(req.body);

    console.log("Validation Error:", error);

    if (error) {
      return res
        .status(400)
        .json({ message: "Validation error", details: error.details });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt); // bcrypt ნიშნავს შემიქმენი ჰაში ამ პაროლისთვის სალთის მიხედვით
    const query = `INSERT INTO users (email, password, photo, bookmarks)
    VALUES($1, $2, $3, $4)
    RETURNING *;`;
    const values = [email, hashedPassword, photo, bookmarks];
    const result = await pool.query(query, values);
    await sendVerificationLink(
      email,
      "https://entertainment-web-app-back-production.up.railway.app/verify" //ასეთი როუთი გვექნება ფრონტში რეაქტზე (ვერცელის)
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    return res.status(401).json(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const query = `
      SELECT * FROM users
      WHERE email = $1;
    `;

    const result = await pool.query(query, [email]);

    if (result.rows.length === 1) {
      const user = result.rows[0];
      const hashedPassword = user.password;

      const passwordsMatch = await bcrypt.compare(password, hashedPassword);

      if (passwordsMatch) {
        try {
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
        return res.status(401).json("Password is incorrect");
      }
    } else {
      return res.status(401).json("User with this email does not exist");
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
