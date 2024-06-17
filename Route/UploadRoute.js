import express from "express";
import path from "path";
import multer from "multer";
import fs from "fs"; // Import the Node.js filesystem module

import PhotoUploadClass from "../Controller/UploadController.js";
import { verifyToken, verifyTokenAdmin } from "../Middleware/VerifyToken.js";

const __dirname = path.resolve(); // Get the directory where Node.js was started

const uploadrouter = express.Router();

// Define the destination directory for file uploads
const uploadDirectory = path.join(__dirname, "upload", "images");

// Ensure the upload directory exists; create it if it doesn't
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Configure multer to use disk storage with the destination directory
const storage = multer.diskStorage({
  destination: uploadDirectory,
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });

uploadrouter.post("/upload", verifyTokenAdmin ,upload.single("image"), PhotoUploadClass.uploadPhoto);

export default uploadrouter;
