import express from "express";
import pool from "./config/database.js";

const app = express();

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");

    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

app.listen(process.env.PORT || 3000);
