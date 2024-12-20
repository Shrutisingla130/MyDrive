// using multer as middleware
// here we are using disc storage not memory storage
//check its documentation in nodejs
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //cb is callback
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    //   cb(null, file.originalname)
    // Ensure a unique filename by appending a timestamp
    const timestamp = Date.now(); // Current timestamp
    const uniqueName = `${timestamp}-${file.originalname}`; // Append timestamp to original filename
    cb(null, uniqueName);
  },
});

export const upload = multer({
  storage,
});
