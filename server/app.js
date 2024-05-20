import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
//routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config({ path: "./config.env" });

const app = express();

//enable the cors
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true, // Enable credentials (cookies, authorization headers, etc.)
    optionsSuccessStatus: 200, // Some legacy browsers choke on 204
  })
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cookieParser());

//Auth router
app.use("/api/v1/auth", authRoutes);

//User router
app.use("/api/v1/user", userRoutes);

export { app };
