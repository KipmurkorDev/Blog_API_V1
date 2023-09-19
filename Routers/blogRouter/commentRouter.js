const express = require("express");
const {
  getAllCommentByBlog,
  createComment,
  editComment,
  deleteComment,
} = require("../../Controllers/blogController/commentController");
const commentRouter = express.Router();
const useAuth = require("../../Middleware/authVerification");

// get commesnt for blog. No authentication
commentRouter.get("/:blog_id", getAllCommentByBlog);
commentRouter.use(useAuth);

// add, edit or delete commesnt for blog. Need authentication
commentRouter.post("/:blog_id", createComment);
commentRouter.put("/update/:blog_id/:comment_id", editComment);
commentRouter.delete("/:blog_id/:comment_id", deleteComment);

module.exports = commentRouter;
