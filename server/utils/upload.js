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

export { upload };
