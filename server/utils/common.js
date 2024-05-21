import jwt from "jsonwebtoken";
import multer from "multer";
import dotevn from "dotenv";
dotevn.config({ path: "../config.env" });

//setup storge for upload file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.filename}`);
  },
});

const upload = multer({ storage });

//function for genrating JWT token
const generateToken = (userId, rememberMe = false) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: rememberMe ? "30d" : "1h", // Token expiration time
  });
};

export { upload, generateToken };
