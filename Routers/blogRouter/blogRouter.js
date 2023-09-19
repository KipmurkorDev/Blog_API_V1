const express = require("express");
const {
  createBlog,
  getAllBlogs,
  editBlog,
  deleteBlog,
  likeBlog,
  coAuthors,
} = require("../../Controllers/blogController/blogController");
const useAuth = require("../../Middleware/authVerification");

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.use(useAuth);
blogRouter.post("/", createBlog);
blogRouter.put("/:blog_id", editBlog);
blogRouter.delete("/:blog_id", deleteBlog);
blogRouter.patch("/:blog_id/like", likeBlog);
blogRouter.patch("/:blog_id/co-authors", coAuthors);
module.exports = blogRouter;
