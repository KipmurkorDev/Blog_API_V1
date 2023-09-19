const express = require("express");
const {
  getAllCommentByBlog,
  createComment,
  editComment,
  deleteComment,
} = require("../../Controllers/commentController/commentController");
const commentRouter = express.Router();
const useAuth = require("../../Middleware/authVerification");

// get comments by specific blog
commentRouter.get("/:blog_id", getAllCommentByBlog);
commentRouter.use(useAuth);
// create new comment
commentRouter.post("/:blog_id", createComment);
// update comment
commentRouter.put("/:blog_id/:comment_id", editComment);
// delete comment
commentRouter.delete("/:blog_id/:comment_id", deleteComment);

module.exports = commentRouter;
