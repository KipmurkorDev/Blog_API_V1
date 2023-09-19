const blogSchema = require("../../Model/blogModel");
const { blogJoiSchema } = require("../../script/validators");
const commentSchema = require("../../Model/commentModel");
const authorModel = require("../../Model/authModel");
const mongoose = require("mongoose");
// create a blog function
const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const author = res.locals.author;

    const validation = blogJoiSchema.validate({ ...req.body, author });
    if (validation.error) {
      return res
        .status(400)
        .json({ message: validation.error.details[0].message });
    }

    const newPost = new blogSchema({ title, content, author });
    const results = await newPost.save();

    return res.status(201).json(results);
  } catch (ex) {
    console.error(ex);
    return res.status(500).json({ error: ex.message });
  }
};
// get all the blogs
const getAllBlogs = async (req, res) => {
  try {
    const results = await blogSchema.find({});
    return res.status(200).json(results);
  } catch (ex) {
    return res.status(500).json({ error: ex.message });
  }
};
// edit single blog for a given ID
const editBlog = async (req, res) => {
  try {
    const _id = req.params.blog_id;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: "Invalid id" });
    }
    const blog = await blogSchema.findOne({ _id });
    if (!blog) {
      return res.status(404).json({
        message:
          "Not Found: The blog requested does not exist or has been deleted",
      });
    }
    // validation fuction
    const validation = blogJoiSchema.validate({ ...req.body });
    if (validation.error) {
      return res
        .status(400)
        .json({ message: validation.error.details[0].message });
    }
    // update the blog
    const response = await blogSchema.updateOne(
      { _id },
      { $set: { ...req.body } }
    );
    return res.status(200).json(response);
  } catch (ex) {
    return res.status(500).json({ error: ex.message });
  }
};
// delete a blog for given id
const deleteBlog = async (req, res) => {
  try {
    const _id = req.params.blog_id;
    // check if ID is valid
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: "Invalid id" });
    }
    const blog = await blogSchema.findOne({ _id });
    // Check if the blog exists
    if (!blog) {
      return res
        .status(404)
        .json({ message: "Not Found: The blog requested is already deleted" });
    }
    // delete the blog and cascade to the comment with blog ID
    const response = await blogSchema.deleteOne({ _id });
    await commentSchema.deleteMany({ blog: _id });

    return res
      .status(200)
      .json({ response, message: "Blog has been successfully deleted." });
  } catch (ex) {
    return res.status(500).json({ error: ex.message });
  }
};
// like a blog
const likeBlog = async (req, res) => {
  try {
    const { blog_id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(blog_id)) {
      return res.status(400).json({ message: "Invalid id" });
    }
    const blog = await blogSchema.findOne({ _id: blog_id });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const blogLikesById = blog?.likes?.map((json) => json._id.toString()) || [];
    const author = res.locals.author;

    if (!blogLikesById.includes(author)) {
      // user like
      blog.likes.push(author);
      blog.likeCount += 1;
    } else {
      // user dislike
      const findIndex = blog.likes.indexOf(author);
      blog.likes.splice(findIndex, 1);
      blog.likeCount -= 1;
    }
    // save the blog
    await blog.save();

    return res.status(200).json(blog);
  } catch (ex) {
    return res.status(500).json({ error: ex.message });
  }
};
// add co-Authors to blog

const coAuthors = async (req, res) => {
  try {
    const { blog_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(blog_id)) {
      return res.status(400).json({ message: "Invalid blog_id" });
    }

    const blog = await blogSchema.findById({ _id: blog_id });
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    const { coAuthorName, coAuthorEmail } = req.body;
    const isEmailIncluded = blog?.coAuthors?.some(
      (obj) => obj.coAuthorEmail === coAuthorEmail
    );

    if (isEmailIncluded) {
      return res
        .status(409)
        .json({ status: "error", message: "Co-author already added." });
    }
    blog.coAuthors.push({ coAuthorEmail, coAuthorName });
    await blog.save();
    return res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  editBlog,
  deleteBlog,
  likeBlog,
  coAuthors,
};
