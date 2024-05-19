import { db } from "../utils/db.js";
import dotenv from "dotenv";
dotenv.config({ path: "../config.env" });

const getUser = async (req, res) => {
  try {
    const { email } = req.user;

    const user = await db.query("SELECT * FROM users WHERE email_id = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ data: user.rows[0], message: "successful" });
  } catch (error) {
    console.log("Error during signup", error);
    res.status(500).json({
      error: "Error during signup",
    });
  }
};

export { getUser };
