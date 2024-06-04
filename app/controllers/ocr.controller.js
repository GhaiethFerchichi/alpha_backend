const { default: axios } = require("axios");
const fs = require("fs");
const path = require("path");
const FormData = require("form-data");

const getPDF = (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

const ocrImage = async (req, res) => {
  const {
    file,
    file: { filename },
  } = req;
  try {
    try {
      const formData = new FormData();
      formData.append(
        "image_file",
        fs.createReadStream(path.resolve(__dirname) + "/../uploads/" + filename)
      );

      const response = await axios.post(
        "http://127.0.0.1:5000/upload_image",
        formData,
        { headers: formData.getHeaders() }
      );

      textOCR = response.data.text.replace("\n", " ");
      return res.status(200).json({
        success: true,
        message: "Processing ocr image",
        data: textOCR,
      });
    } catch (error) {
      console.error("error");
      return res.status(500).json({
        success: false,
        message: "Error uploading file to Flask API.",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

module.exports = { ocrImage };
