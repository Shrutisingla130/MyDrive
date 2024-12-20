const express = require("express");
const { upload } = require("../config/multer.config");
const router = express.Router();
const fileModel = require("../models/files.models.js"); // Import the schema
const authMiddleware = require("../middlewares/authe.js");
const cloudinary = require("../config/cloudinary.js");

router.get("/home", authMiddleware, async (req, res) => {
  try {
    // req.user give user details because of authmiddleware

    const userFiles = await fileModel.find({
      user: req.user.userId,
    });

    res.render("home", {
      files: userFiles,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      //500 Internal Server Error
      message: "server error",
    });
  }
});

// for uploading file we make post route
//'file' is written in home.ejs in input file name
//usually if same file uplaoded again it gets updated but we want is same file uploaded again then it also adds in our storage

router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  async (req, res) => {
    const newFile = await fileModel.create({
      path: req.file.path,
      originalname: req.file.originalname,
      filename: req.file.filename,
      user: req.user.userId,
      //userlogin->userid set ki, aur jab file uploaad-> token decode krke-> userid nikal li-> using this userid here
    });

    // res.json(newFile);
    res.redirect('/home');
  }
);

const path = require("path");

router.get("/download/:path", authMiddleware, async (req, res) => {
  const filePath = path.join(__dirname, "../public/temp", req.params.path);

  // console.log("File path to download:", filePath); // For debugging
  res.download(filePath, (err) => {
    if (err) {
      console.error("Error downloading file:", err);
      res.status(500).send("Error downloading file.");
    }
  });
  //500 Internal Server Error
  //The second argument is a callback function that handles any errors during the download process.
});

module.exports = router;
