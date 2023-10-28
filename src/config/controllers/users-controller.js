import pool from "../database/database.js";

export const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");

    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
