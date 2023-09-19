const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  blog: {
    type: mongoose.Schema.ObjectId,
    ref: "Blog",
    required: true,
  },
  user_info: {
    type: mongoose.Schema.ObjectId,
    ref: "Author",
    required: true,
  },
  comment: {
    type: String,
    required: [true, "Please a provide a comment "],
  },
});
const commentModel = mongoose.model("Comment", commentSchema);
module.exports = commentModel;
