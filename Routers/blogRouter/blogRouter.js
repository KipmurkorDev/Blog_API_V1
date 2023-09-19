const express = require("express");
const {
  createBlog,
  getAlLBlog,
  editBlog,
  deleteBlog,
  likeBlog,
} = require("../../Controllers/blogController/blogController");
const useAuth = require("../../Middleware/authVerification");

const blogRouter = express.Router();

// get all  blogs. No authentication
blogRouter.get("/", getAlLBlog);

// auth middleware
blogRouter.use(useAuth);

// add, edit, like/dislike or delete blog.  Need authentication
blogRouter.post("/article", createBlog);
blogRouter.put("/article/update/:blog_id", editBlog);
blogRouter.delete("/article/:blog_id", deleteBlog);
blogRouter.post("/article/like/:blog_id", likeBlog);

module.exports = blogRouter;
