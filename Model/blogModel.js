const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
    unique: true,
    minlength: [4, "Please provide a title least 4 characters "],
  },
  content: {
    type: String,
    required: [true, "Please a provide a content "],
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "Author",
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Author",
    },
  ],
  likeCount: {
    type: Number,
    default: 0,
  },
});
const blogModel = mongoose.model("Blog", blogSchema);
module.exports = blogModel;
