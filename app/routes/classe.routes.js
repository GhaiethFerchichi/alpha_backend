const {
  getAllClasses,
  createClass,
  getClassById,
  updateClass,
  deleteClass,
  saveFromExcelClasse,
} = require("../controllers/Classe.controller");

const path = require("path");
const fs = require("fs");
const multer = require("multer");
const express = require("express");
const classeRouter = express.Router();

// Create the uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, "../uploads/excel");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

classeRouter.route("/").get(getAllClasses).post(createClass);

classeRouter
  .route("/:classeId")
  .get(getClassById)
  .put(updateClass)
  .delete(deleteClass);

classeRouter
  .route("/excel/:classeId")
  .post(upload.single("uploaded_excel"), saveFromExcelClasse);

module.exports = classeRouter;
