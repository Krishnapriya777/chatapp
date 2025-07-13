// middleware/multer.js

import multer from "multer";

// Configure storage —
// Here we use diskStorage with empty options => multer uses OS temp folder
const storage = multer.diskStorage({});

// Optional: You can add file size limits or filters if you want:
const limits = {
  fileSize: 5 * 1024 * 1024, // Max file size: 5 MB
};

// Optional: File filter — only accept images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Only image files are allowed!"), false); // Reject the file
  }
};

// Export a pre-configured upload middleware
const upload = multer({ storage, limits, fileFilter });

export default upload;
