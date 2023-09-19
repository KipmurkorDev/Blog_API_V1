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
// GET request to retrieve all blogs
blogRouter.get("/", getAllBlogs);
// Middleware to enforce authentication for subsequent routes
blogRouter.use(useAuth);
// POST request to create a new blog
blogRouter.post("/", createBlog);
// PUT request to edit an existing blog by its ID
blogRouter.put("/:blog_id", editBlog);
// DELETE request to delete an existing blog by its ID
blogRouter.delete("/:blog_id", deleteBlog);
// PATCH request to like a specific blog by its ID
blogRouter.patch("/:blog_id/like", likeBlog);
// PATCH request to manage co-authors for a specific blog by its ID
blogRouter.patch("/:blog_id/co-authors", coAuthors);

module.exports = blogRouter;
