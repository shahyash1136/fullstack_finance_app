import multer from "multer";

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
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h", // Token expiration time
  });
};

export { upload, generateToken };
