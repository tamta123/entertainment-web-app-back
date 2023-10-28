import pool from "../database/database.js";

export const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");

    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const addUSer = async (req, res) => {
  const { email, password, photo, bookmarks } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const query = `INSERT INTO users (email, password, photo, bookmarks)
    VALUES($1, $2, $3, $4)
    RETURNING *;`;
    const values = [email, password, photo, bookmarks];
    const result = await pool.query(query, values);
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    return res.status(401).json(error);
  }
};
