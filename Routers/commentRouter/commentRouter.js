const express = require("express");
const {
  getAllCommentByBlog,
  createComment,
  editComment,
  deleteComment,
} = require("../../Controllers/commentController/commentController");
const commentRouter = express.Router();
const useAuth = require("../../Middleware/authVerification");

commentRouter.get("/:blog_id", getAllCommentByBlog);
commentRouter.use(useAuth);
commentRouter.post("/:blog_id", createComment);
commentRouter.put("/:blog_id/:comment_id", editComment);
commentRouter.delete("/:blog_id/:comment_id", deleteComment);

module.exports = commentRouter;
