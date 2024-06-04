const { ocrImage } = require("../controllers/ocr.controller");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Create the uploads directory if it doesn't exist
const uploadDir = "./app/uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer storage options
const storage = multer.diskStorage({
  destination: (req, file, callbackFunction) => {
    callbackFunction(null, "./app/uploads/");
  },
  filename: (req, file, callbackFunction) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callbackFunction(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });
const ocrRouter = require("express").Router();

ocrRouter.route("/image").post(upload.single("uploaded_doc"), ocrImage);

module.exports = ocrRouter;
