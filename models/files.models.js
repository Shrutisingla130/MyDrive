const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  path: {
    type: String,
    required: [true, "File path is required"],
  },
  originalname: {
    type: String,
    required: [true, "Original file name is required"],
  },
user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // Refers to the User model
    required: [true, 'user is required'], // Ensure every file is tied to a user
  }, //Ensures that the file belongs to a specific user.
});

const file = mongoose.model("file", fileSchema);

module.exports = file;
