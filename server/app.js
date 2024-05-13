import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
//routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config({ path: "./config.env" });

const app = express();

//enable the cors
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

//Auth router
app.use("/api/v1/auth", authRoutes);

//User router
app.use("/api/v1/user", userRoutes);

export { app };
