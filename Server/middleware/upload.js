import multer from "multer";
import path from "path";
import fs from "fs";

const uploadPath = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// ✅ CSV + IMAGE SUPPORT
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "text/csv",
    "application/vnd.ms-excel",
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp"
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only CSV and Image files allowed"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
});