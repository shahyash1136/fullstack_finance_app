import { db } from "../utils/db.js";
import dotenv from "dotenv";
dotenv.config({ path: "../config.env" });

const getUser = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await db.query("SELECT * FROM users WHERE user_id = $1", [id]);

    if (user.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ data: user.rows[0], message: "successful" });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export { getUser };
