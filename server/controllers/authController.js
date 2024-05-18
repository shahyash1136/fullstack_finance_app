import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { db } from "../utils/db.js";
import dotevn from "dotenv";
import { generateToken } from "../utils/common.js";
dotevn.config({ path: "../config.env" });

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const existingUser = await db.query(
      "SELECT * FROM users WHERE email_id = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ message: "Email Id already exists" });
    }

    const newUser = await db.query(
      "INSERT INTO users (first_name, last_name, email_id, hash_password) VALUES ($1,$2,$3,$4) RETURNING *",
      [firstName, lastName, email, hashPassword]
    );

    //generate token
    const token = generateToken(newUser.rows[0].id);

    // Set the token in an HTTP-only cookie
    res.cookie("jwt", token, {
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === "production", // Ensures the cookie is sent over HTTPS in production
      maxAge: 3600000, // 1 hour in milliseconds
    });

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.log("Error during signup", error);
    res.status(500).json({
      error: "Error during signup",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //get the user from the DB
    const user = await db.query("SELECT * FROM users WHERE email_id = $1", [
      email,
    ]);

    //check if user exist
    if (user.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].hash_password
    );

    //check if password is valid or not
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    //generate token
    const token = generateToken(newUser.rows[0].id);

    // Set the token in an HTTP-only cookie
    res.cookie("jwt", token, {
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === "production", // Ensures the cookie is sent over HTTPS in production
      maxAge: 3600000, // 1 hour in milliseconds
    });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error during login", error);
    res.status(500).json({ message: "Error during login" });
  }
};

export { register, login };
